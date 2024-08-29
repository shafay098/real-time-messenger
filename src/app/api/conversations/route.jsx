import getCurrentUser from "../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);
    const { userId, isGroup, members, name } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("unAuthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Daata", { status: 400 });
    }
    if (isGroup) {
      const newConversations = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member) => ({ id: member?.value })),
              { id: currentUser.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversations);
    }
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (err) {
    console.log("🚀 ~ POST ~ err:", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
      message: err?.message,
    });
  }
}
