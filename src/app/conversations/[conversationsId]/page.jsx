import React from "react";
import getConversationId from "../../actions/getConversationById";
import getMessages from "../../actions/getMessages";
import EmptyState from "../../../components/ProjectComponents/EmptyState/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

const ConversationId = async ({ params }) => {
  console.log("🚀 ~ ConversationId ~ params:", params);
  const conversation = await getConversationId(params?.conversationsId);
  console.log("🚀 ~ ConversationId ~ conversation:", conversation);
  const messages = await getMessages(params.conversationsId);

  if (!conversation) {
    {
      return (
        <div className="lg:pl-80 h-full">
          <div className="h-full flex flex-col">
            <EmptyState />
          </div>
        </div>
      );
    }
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-screen flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
