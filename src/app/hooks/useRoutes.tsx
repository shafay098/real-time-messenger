"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";

import { signOut } from "next-auth/react";
import useConverstaion from "./useConverstaions";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConverstaion();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/converstaions",
        icon: HiChat,
        active: pathname === "/converstaions" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: VscSignOut,
        onclick: () => signOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
