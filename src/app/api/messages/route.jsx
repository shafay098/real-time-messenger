import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";
import prisma from "../../libs/prismadb";
import { connect } from "http2";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);
    const { message, image, conversationId } = body;
    console.log("🚀 ~ POST ~ conversationId:", conversationId);
    console.log("🚀 ~ POST ~ image:", image);
    console.log("🚀 ~ POST ~ message:", message);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        images: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updateedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
  } catch (e) {
    console.log(e);
    console.log("🚀 ~ POST ~ e:", e);
    return new NextResponse("InternalError", { status: 500 });
  }
}
