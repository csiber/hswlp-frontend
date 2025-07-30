import { getDB } from '@/db';
import { appTable } from '@/db/schema';
import { desc, or, eq, inArray } from 'drizzle-orm';
import type { App } from '@/db/schema';

export async function getAllApps(): Promise<App[]> {
  const db = getDB();
  return db
    .select()
    .from(appTable)
    .where(
      or(eq(appTable.featured, 1), inArray(appTable.type, ['shell', 'pages']))
    )
    .orderBy(desc(appTable.createdAt));
}

