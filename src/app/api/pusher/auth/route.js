import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { pusherServer } from "../../../libs/pusher";

export async function POST(request) {
  try {
    let socket_id, channel_name;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("No sessions created", { status: 401 });
    }
    const body = await request.text();
    const params = new URLSearchParams(body);
    socket_id = params.get("socket_id");
    channel_name = params.get("channel_name");

    const data = {
      user_id: session?.user?.email,
    };

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      data
    );

    return NextResponse.json(authResponse);
  } catch (e) {
    console.log("pusher error : ", e);
    return new NextResponse(e.message, { status: 500 });
  }
}
