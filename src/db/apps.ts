import { getDB } from './index'
import { appTable, appCategoryTable } from './schema'
import { eq } from 'drizzle-orm'

export async function getAllCategories() {
  const db = getDB()
  return db.select().from(appCategoryTable)
}

export async function getCategoryBySlug(slug: string) {
  const db = getDB()
  return db.query.appCategoryTable.findFirst({ where: eq(appCategoryTable.slug, slug) })
}

export async function getAllApps() {
  const db = getDB()
  return db.select().from(appTable)
}

export async function getAppsByCategorySlug(slug: string) {
  const db = getDB()
  return db.query.appTable.findMany({ where: eq(appTable.categorySlug, slug) })
}

export async function getAppBySlug(slug: string) {
  const db = getDB()
  return db.query.appTable.findFirst({ where: eq(appTable.slug, slug) })
}

export async function createCategory(data: {
  slug: string
  name: string
  emoji?: string | null
  description?: string | null
}) {
  const db = getDB()
  const [cat] = await db.insert(appCategoryTable).values(data).returning()
  return cat
}

export async function createApp(data: {
  name: string
  slug: string
  description?: string | null
  url?: string | null
  icon?: string | null
  categorySlug: string
  type?: string | null
  featured?: number | boolean
}) {
  const db = getDB()
  const [app] = await db.insert(appTable).values(data).returning()
  return app
}
