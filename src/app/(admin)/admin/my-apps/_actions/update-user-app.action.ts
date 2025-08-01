"use server";

import { createServerAction, ZSAError } from "zsa";
import { updateUserApp } from "@/server/user-apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  status: z.string().optional(),
  notes: z.string().optional().nullable(),
});

export const updateUserAppAction = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    await requireAdmin();
    try {
      const { id, ...data } = input;
      await updateUserApp(id, data);
      return { success: true };
    } catch {
      throw new ZSAError("ERROR", "Failed to update user app");
    }
  });
