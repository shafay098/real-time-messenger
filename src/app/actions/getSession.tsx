import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/AuthOptions";

export default async function getSession() {
  return await getServerSession(authOptions);
}
