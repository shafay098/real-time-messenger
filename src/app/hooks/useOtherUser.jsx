import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { User } from "@prisma/client";

const useOtherUser = (conversation) => {
  console.log("🚀 ~ useOtherUser ~ conversation:", conversation);
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentuserEmail = session?.data?.user?.email;
    const otherUser = conversation?.users?.filter(
      (user) => user?.email !== currentuserEmail
    );
    return otherUser[0];
  }, [session?.data?.user?.email, conversation?.users]);

  return otherUser;
};

export default useOtherUser;
