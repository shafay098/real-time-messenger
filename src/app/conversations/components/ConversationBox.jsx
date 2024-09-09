"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/components/ProjectComponents/Avatar/Avatar";
import AvatarGroup from "@/components/ProjectComponents/AvatarGroup";

const ConversationBox = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const hanldeClick = useCallback(() => {
    router.push(`/conversations/${data?.id}`);
  }, [data?.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data?.messages || [];
    return messages[messages.length - 1];
  }, [data?.messages]);

  console.log("🚀 ~ lastMessage ~ lastMessage:", lastMessage);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user?.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  console.log("🚀 ~ lastMessageText ~ lastMessageText:", lastMessageText);
  return (
    <div
      onClick={hanldeClick}
      className={`w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3  ${
        selected ? "bg-neutral-100" : "bg-white"
      }`}
    >
      {data.isGroup ? (
        <AvatarGroup users={data?.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1 ">
        <div className="focus:outline-none">
          <div className="flex justify-between  items-center mb-1">
            <p className="text-md text-sm text-center w-full font-medium text-gray-900">
              {data?.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-center text-gray-400 w-full font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={`truncate text-sm  ${
              hasSeen ? "text-gray-500" : "text-black font-medium"
            } ${data?.isGroup && "text-right"}`}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
