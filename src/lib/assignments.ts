import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "#/db";
import { assignments } from "#/db/schema";
import { requireUserId } from "#/lib/session.server";

export const getAssignments = createServerFn({ method: "GET" }).handler(async () => {
  const userId = await requireUserId();
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.userId, userId))
    .orderBy(assignments.dueDate);
});

export const createAssignment = createServerFn({ method: "POST" })
  .validator((data: { title: string; dueDate: string }) => data)
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    await db.insert(assignments).values({
      title: data.title,
      dueDate: new Date(data.dueDate),
      userId,
    });
  });
