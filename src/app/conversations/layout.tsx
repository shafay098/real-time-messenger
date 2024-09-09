import Sidebar from "@/components/ProjectComponents/SideBar/SideBar";
import Conversation_list from "./components/conversation_list";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUser";
export default async function ConversationsLayout({ children }) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <Conversation_list users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
