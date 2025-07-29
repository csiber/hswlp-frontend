"use server";

import { createServerAction, ZSAError } from "zsa";
import { updateApp } from "@/server/apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";
import { generateSlug } from "@/utils/slugify";

const updateAppSchema = z.object({
  id: z.string().min(1),
  data: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    icon: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const updateAppAction = createServerAction()
  .input(updateAppSchema)
  .handler(async ({ input }) => {
    await requireAdmin();
    const { id, data } = input;
    if (data.slug) {
      data.slug = generateSlug(data.slug);
    }
    try {
      const app = await updateApp(id, { ...data, featured: data.featured ? 1 : 0 });
      return { app };
    } catch {
      throw new ZSAError("ERROR", "Failed to update app");
    }
  });
