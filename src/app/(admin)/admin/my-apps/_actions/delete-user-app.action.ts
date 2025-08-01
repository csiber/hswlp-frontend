"use server";

import { createServerAction, ZSAError } from "zsa";
import { deleteUserApp } from "@/server/user-apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";

export const deleteUserAppAction = createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await requireAdmin();
    try {
      await deleteUserApp(input.id);
      return { success: true };
    } catch {
      throw new ZSAError("ERROR", "Failed to delete user app");
    }
  });
