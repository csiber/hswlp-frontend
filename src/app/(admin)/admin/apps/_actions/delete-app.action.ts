"use server";

import { createServerAction, ZSAError } from "zsa";
import { deleteApp } from "@/server/apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";

const deleteSchema = z.object({ id: z.string().min(1) });

export const deleteAppAction = createServerAction()
  .input(deleteSchema)
  .handler(async ({ input }) => {
    await requireAdmin();
    try {
      await deleteApp(input.id);
      return { success: true };
    } catch {
      throw new ZSAError("ERROR", "Failed to delete app");
    }
  });
