"use server";

import { createServerAction, ZSAError } from "zsa";
import { createApp } from "@/server/apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";
import { generateSlug } from "@/utils/slugify";

const createAppSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url().optional(),
  icon: z.string().optional(),
  category: z.string().optional(),
  type: z.string().min(1),
  featured: z.boolean().optional().default(false),
});

export const createAppAction = createServerAction()
  .input(createAppSchema)
  .handler(async ({ input }) => {
    await requireAdmin();
    const slug = generateSlug(input.slug || input.name);
    try {
      const app = await createApp({ ...input, slug, featured: input.featured ? 1 : 0 });
      return { app };
    } catch {
      throw new ZSAError("ERROR", "Failed to create app");
    }
  });
