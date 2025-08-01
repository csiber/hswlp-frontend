import "server-only";
import { getDB } from "@/db";
import { userAppTable, contractTable } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq, sql } from "drizzle-orm";

export async function getUserApps(page: number, pageSize: number) {
  const db = getDB();
  const offset = (page - 1) * pageSize;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userAppTable);

  const apps = await db.query.userAppTable.findMany({
    with: {
      user: true,
      app: true,
    },
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit: pageSize,
    offset,
  });

  return { apps, totalCount: count };
}

export async function createUserApp(data: {
  userId: string;
  appId: string;
  status: string;
  notes?: string | null;
  contract?: { title: string; fileUrl?: string | null };
}) {
  const db = getDB();
  const id = `uapp_${createId()}`;
  await db.insert(userAppTable).values({
    id,
    userId: data.userId,
    appId: data.appId,
    status: data.status,
    notes: data.notes ?? null,
  });

  if (data.contract) {
    await db.insert(contractTable).values({
      userId: data.userId,
      userAppId: id,
      title: data.contract.title,
      fileUrl: data.contract.fileUrl ?? null,
    });
  }
}

export async function updateUserApp(
  id: string,
  data: Partial<{ status: string; notes: string | null }>
) {
  const db = getDB();
  const [app] = await db
    .update(userAppTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(userAppTable.id, id))
    .returning();
  return app;
}

export async function deleteUserApp(id: string) {
  const db = getDB();
  await db.delete(userAppTable).where(eq(userAppTable.id, id));
}
