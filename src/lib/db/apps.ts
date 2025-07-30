import { getDB, getDBAsync } from '@/db';
import { appTable } from '@/db/schema';
import { desc, eq, inArray, and, not } from 'drizzle-orm';
import type { App } from '@/db/schema';

export async function getAllApps(): Promise<App[]> {
  const db = await getDB();
  return db
    .select()
    .from(appTable)
    .where(inArray(appTable.type, ['shell', 'pages']))
    .orderBy(desc(appTable.createdAt));
}

export async function getAllAppsAsync(): Promise<App[]> {
  const db = await getDBAsync();
  return db
    .select()
    .from(appTable)
    .where(inArray(appTable.type, ['shell', 'pages']))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppsByType(type: string): Promise<App[]> {
  const db = await getDB();
  return db
    .select()
    .from(appTable)
    .where(eq(appTable.type, type))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppBySlug(slug: string): Promise<App | undefined> {
  const db = await getDB();
  return db.query.appTable.findFirst({ where: eq(appTable.slug, slug) });
}

export async function getAppBySlugAsync(slug: string): Promise<App | undefined> {
  const db = await getDBAsync();
  return db.query.appTable.findFirst({ where: eq(appTable.slug, slug) });
}

export async function getSimilarApps(
  category: string,
  slug: string,
  limit = 3
): Promise<App[]> {
  const db = await getDB();
  return db.query.appTable.findMany({
    where: and(eq(appTable.category, category), not(eq(appTable.slug, slug))),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

export async function getSimilarAppsAsync(
  category: string,
  slug: string,
  limit = 3
): Promise<App[]> {
  const db = await getDBAsync();
  return db.query.appTable.findMany({
    where: and(eq(appTable.category, category), not(eq(appTable.slug, slug))),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

export async function getFeaturedApps(limit = 4): Promise<App[]> {
  const db = await getDB();
  return db.query.appTable.findMany({
    where: eq(appTable.featured, 1),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

export async function getFeaturedAppsAsync(limit = 4): Promise<App[]> {
  const db = await getDBAsync();
  return db.query.appTable.findMany({
    where: eq(appTable.featured, 1),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

