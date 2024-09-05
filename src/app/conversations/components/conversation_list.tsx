"use client";

import React, { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import useConverstaion from "@/app/hooks/useConversations";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

// interface ConversationListProps {
//   initialItems: FullConversationType[];
// }

const Conversation_list = ({ users, initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConverstaion();
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
