import { getDB, getDBAsync } from '@/db';
import { appTable } from '@/db/schema';
import { desc, eq, inArray, and, not } from 'drizzle-orm';
import type { App } from '@/db/schema';

const EXCLUDED_APP_SLUGS: string[] = ['playcore', 'hostly', 'synapseos'];
const excludeAppsCondition = not(inArray(appTable.slug, EXCLUDED_APP_SLUGS));

export async function getAllApps(): Promise<App[]> {
  const db = await getDB();
  return db
    .select()
    .from(appTable)
    .where(and(inArray(appTable.type, ['shell', 'pages']), excludeAppsCondition))
    .orderBy(desc(appTable.createdAt));
}

export async function getAllAppsAsync(): Promise<App[]> {
  const db = await getDBAsync();
  return db
    .select()
    .from(appTable)
    .where(and(inArray(appTable.type, ['shell', 'pages']), excludeAppsCondition))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppsByType(type: string): Promise<App[]> {
  const db = await getDB();
  return db
    .select()
    .from(appTable)
    .where(and(eq(appTable.type, type), excludeAppsCondition))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppBySlug(slug: string): Promise<App | undefined> {
  if (EXCLUDED_APP_SLUGS.includes(slug)) return undefined;
  const db = await getDB();
  return db.query.appTable.findFirst({ where: eq(appTable.slug, slug) });
}

export async function getAppBySlugAsync(slug: string): Promise<App | undefined> {
  if (EXCLUDED_APP_SLUGS.includes(slug)) return undefined;
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
    where: and(
      eq(appTable.category, category),
      not(eq(appTable.slug, slug)),
      excludeAppsCondition,
    ),
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
    where: and(
      eq(appTable.category, category),
      not(eq(appTable.slug, slug)),
      excludeAppsCondition,
    ),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

export async function getFeaturedApps(limit = 4): Promise<App[]> {
  const db = await getDB();
  return db.query.appTable.findMany({
    where: and(eq(appTable.featured, 1), excludeAppsCondition),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

export async function getFeaturedAppsAsync(limit = 4): Promise<App[]> {
  const db = await getDBAsync();
  return db.query.appTable.findMany({
    where: and(eq(appTable.featured, 1), excludeAppsCondition),
    orderBy: (apps, { desc }) => [desc(apps.createdAt)],
    limit,
  });
}

export async function getCategories(): Promise<string[]> {
  const db = await getDB();
  const rows = await db
    .selectDistinct({ category: appTable.category })
    .from(appTable)
    .where(excludeAppsCondition);
  return rows
    .map(r => r.category)
    .filter((c): c is string => Boolean(c))
    .sort();
}

export async function getCategoriesAsync(): Promise<string[]> {
  const db = await getDBAsync();
  const rows = await db
    .selectDistinct({ category: appTable.category })
    .from(appTable)
    .where(excludeAppsCondition);
  return rows
    .map(r => r.category)
    .filter((c): c is string => Boolean(c))
    .sort();
}

export async function getAppsByCategory(category: string): Promise<App[]> {
  const db = await getDB();
  return db
    .select()
    .from(appTable)
    .where(and(eq(appTable.category, category), excludeAppsCondition))
    .orderBy(desc(appTable.createdAt));
}

export async function getAppsByCategoryAsync(
  category: string,
): Promise<App[]> {
  const db = await getDBAsync();
  return db
    .select()
    .from(appTable)
    .where(and(eq(appTable.category, category), excludeAppsCondition))
    .orderBy(desc(appTable.createdAt));
}

