import "server-only";
import { getDB } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserStats(userId: string) {
  const db = getDB();
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
    columns: {
      currentCredits: true,
      activeAppCount: true,
      storageUsage: true,
    },
  });

  return {
    currentCredits: user?.currentCredits ?? 0,
    activeApps: user?.activeAppCount ?? 0,
    storageUsage: user?.storageUsage ?? 0,
  };
}
