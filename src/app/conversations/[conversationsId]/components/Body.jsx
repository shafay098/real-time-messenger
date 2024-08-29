"use client";

import useConversation from "@/app/hooks/useConversations";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

const Body = ({ initialMessages }) => {
  console.log("🚀 ~ Body ~ initialMessages:", initialMessages);
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message?.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
