import prisma from "../libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const sessions = await getSession();

  if (!sessions?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: sessions.user.email,
        },
      },
    });
    return users;
  } catch (err) {
    return [];
  }
};

export default getUsers;
