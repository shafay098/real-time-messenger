import { NextResponse } from "next/server";
import getCurrentUser from "../../../../actions/getCurrentUser";
import prisma from "../../../../libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(req, { params }) {
  console.log("🚀 ~ POST ~ params:", params);
  try {
    const { conversationId } = params;
    console.log("🚀 ~ POST ~ conversationId:", conversationId);
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", {
        status: 401,
        statusText: "no user or user email !",
      });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid id ");
    }

    console.log("🚀 ~ POST ~ conversation:", conversation);
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser?.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId,
      "message:update",
      updatedMessage
    );
    return NextResponse.json(updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", {
      status: "500",
      statusText: e?.message,
    });
  }
}
