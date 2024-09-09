"use client";

import { SessionProvider } from "next-auth/react";

interface AuthContextProvider {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
