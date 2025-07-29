import "server-only";
import { getDB } from "@/db";
import { appTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getApps() {
  const db = getDB();
  return db.select().from(appTable);
}

export async function getAppById(id: string) {
  const db = getDB();
  return db.query.appTable.findFirst({ where: eq(appTable.id, id) });
}

export async function createApp(data: Omit<typeof appTable.$inferInsert, "id" | "createdAt" | "updatedAt" | "updateCounter"> & { id?: string }) {
  const db = getDB();
  const [app] = await db.insert(appTable).values(data).returning();
  return app;
}

export async function updateApp(id: string, data: Partial<typeof appTable.$inferInsert>) {
  const db = getDB();
  const [app] = await db
    .update(appTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(appTable.id, id))
    .returning();
  return app;
}

export async function deleteApp(id: string) {
  const db = getDB();
  await db.delete(appTable).where(eq(appTable.id, id));
}
