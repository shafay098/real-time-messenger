"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";

import { signOut } from "next-auth/react";
import useConverstaion from "./useConversations";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConverstaion();
  console.log("🚀 ~ useRoutes ~ conversationId:", !!conversationId);

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "/",
        icon: VscSignOut,
        onclick: () => {
          console.log("is being clicked!");
          signOut();
        },
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
