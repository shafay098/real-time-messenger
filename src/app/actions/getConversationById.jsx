import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationId = async (conversationId) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (e) {
    return null;
  }
};

export default getConversationId;
