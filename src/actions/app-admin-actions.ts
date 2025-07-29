"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { createApp, createCategory, getAllApps, getAllCategories } from "@/db/apps";
import { requireAdmin } from "@/utils/auth";

export const getAppsAction = createServerAction()
  .handler(async () => {
    await requireAdmin();
    const apps = await getAllApps();
    return { apps };
  });

export const getCategoriesAction = createServerAction()
  .handler(async () => {
    await requireAdmin();
    const categories = await getAllCategories();
    return { categories };
  });

const createCategorySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  emoji: z.string().optional(),
  description: z.string().optional(),
});

export const createCategoryAction = createServerAction()
  .input(createCategorySchema)
  .handler(async ({ input }) => {
    await requireAdmin();
    const cat = await createCategory(input);
    return { category: cat };
  });

const createAppSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  url: z.string().optional(),
  icon: z.string().optional(),
  categorySlug: z.string().min(1),
  type: z.string().optional(),
  featured: z.boolean().optional(),
});

export const createAppAction = createServerAction()
  .input(createAppSchema)
  .handler(async ({ input }) => {
    await requireAdmin();
    const app = await createApp({ ...input, featured: input.featured ? 1 : 0 });
    return { app };
  });
