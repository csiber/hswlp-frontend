import { getDB } from '@/db';
import { appTable } from '@/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';
import type { App } from '@/db/schema';

export async function getAllApps(): Promise<App[]> {
  const db = getDB();
  return db
    .select()
    .from(appTable)
    .where(inArray(appTable.type, ['shell', 'pages']))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppsByType(type: string): Promise<App[]> {
  const db = getDB();
  return db
    .select()
    .from(appTable)
    .where(eq(appTable.type, type))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppBySlug(slug: string): Promise<App | undefined> {
  const db = getDB();
  return db.query.appTable.findFirst({ where: eq(appTable.slug, slug) });
}

