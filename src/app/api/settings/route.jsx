import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";
import prisma from "../../libs/prismadb";

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (e) {
    console.log(e);
    return new NextResponse("InternalError", { status: 500 });
  }
}
