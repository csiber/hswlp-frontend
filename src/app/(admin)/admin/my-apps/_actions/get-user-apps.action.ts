"use server";

import { createServerAction } from "zsa";
import { getUserApps } from "@/server/user-apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";
import { PAGE_SIZE_OPTIONS } from "../../admin-constants";

const schema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(Math.max(...PAGE_SIZE_OPTIONS)).default(10),
});

export const getUserAppsAction = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    await requireAdmin();
    const { page, pageSize } = input;
    const { apps, totalCount } = await getUserApps(page, pageSize);
    return {
      apps: apps.map(app => ({
        id: app.id,
        userEmail: app.user.email,
        appName: app.app.name,
        status: app.status,
        notes: app.notes,
      })),
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  });
