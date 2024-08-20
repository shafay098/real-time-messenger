import Sidebar from "@/components/ProjectComponents/SideBar/SideBar";
import getUsers from "../actions/getUser";
import UserList from "./components/userlist";
export default async function UsersLayout({ children }) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
