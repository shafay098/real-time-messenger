import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from "../../../libs/prismadb";
import { pusherServer } from "../../../libs/pusher";

export async function DELETE(req, { params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    console.log("🚀 ~ DELETE ~ existingConversation:", existingConversation);

    if (!existingConversation) {
      return new NextResponse("Invalid Id ", { status: 400 });
    }

    const deleteConvAndMessage = await prisma.$transaction([
      prisma.message.deleteMany({
        where: {
          conversationId: conversationId,
        },
      }),
      prisma.conversation.deleteMany({
        where: {
          id: conversationId,
          userIds: {
            hasSome: [currentUser.id],
          },
        },
      }),
    ]);

    existingConversation.users.forEach((user) => {
      if (user?.email) {
        pusherServer.trigger(
          user?.email,
          "conversation:remove",
          existingConversation
        );
      }
    });

    return NextResponse.json(deleteConvAndMessage);
  } catch (e) {
    console.log("error message : ", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
