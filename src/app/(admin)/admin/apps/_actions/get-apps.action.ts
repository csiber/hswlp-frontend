"use server";

import { createServerAction } from "zsa";
import { getDB } from "@/db";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { appTable } from "@/db/schema";
import { PAGE_SIZE_OPTIONS } from "../../admin-constants";

const getAppsSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(Math.max(...PAGE_SIZE_OPTIONS)).default(10),
  category: z.string().optional(),
  type: z.string().optional(),
});

export const getAppsAction = createServerAction()
  .input(getAppsSchema)
  .handler(async ({ input }) => {
    await requireAdmin();
    const db = getDB();
    const { page, pageSize, category, type } = input;
    const offset = (page - 1) * pageSize;

    let whereClause = sql`1 = 1`;
    if (category) {
      whereClause = sql`${whereClause} AND ${appTable.category} = ${category}`;
    }
    if (type) {
      whereClause = sql`${whereClause} AND ${appTable.type} = ${type}`;
    }

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(appTable)
      .where(whereClause);

    const apps = await db.query.appTable.findMany({
      where: whereClause,
      orderBy: (apps, { desc }) => [desc(apps.createdAt)],
      limit: pageSize,
      offset,
    });

    return {
      apps,
      totalCount: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  });
