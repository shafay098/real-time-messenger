"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import useConverstaion from "@/app/hooks/useConversations";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

// interface ConversationListProps {
//   initialItems: FullConversationType[];
// }

const Conversation_list = ({ users, initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  const router = useRouter();

  const { conversationId, isOpen } = useConverstaion();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: any) => {
      setItems((current: any) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: any) => {
      setItems((current: any) =>
        current.map((currentConversation: any) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation?.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: any) => {
      setItems((current: any) => {
        return [
          ...current.filter((convo: any) => convo.id !== conversation?.id),
        ];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <aside
        className={`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 ${
          isOpen ? "hidden" : "block w-full left-0"
        }`}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Message</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd />
            </div>
          </div>
          {items?.map((item: any, index: any) => (
            <ConversationBox
              key={item?.id}
              data={item}
              selected={conversationId === item?.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default Conversation_list;
