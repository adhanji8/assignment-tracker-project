import { getRequest } from "@tanstack/react-start/server";

import { auth } from "#/lib/auth";

// Note from Armaan: Simply covenience function for when you need the current user's id inside a
// server function. Lives in a `.server.ts` module so its server-only imports
// never reach the client when Tanstack Start uses Rolldown to bundle app.
export async function requireUserId() {
  const { headers } = getRequest();
  const session = await auth.api.getSession({ headers });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}
