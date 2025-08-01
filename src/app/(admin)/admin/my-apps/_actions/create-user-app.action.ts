"use server";

import { createServerAction, ZSAError } from "zsa";
import { createUserApp } from "@/server/user-apps";
import { requireAdmin } from "@/utils/auth";
import { z } from "zod";

const schema = z.object({
  userId: z.string().min(1),
  appId: z.string().min(1),
  status: z.string().min(1),
  notes: z.string().optional(),
  contractTitle: z.string().optional(),
  contractFileUrl: z.string().optional(),
});

export const createUserAppAction = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    await requireAdmin();
    try {
      await createUserApp({
        userId: input.userId,
        appId: input.appId,
        status: input.status,
        notes: input.notes,
        contract: input.contractTitle
          ? { title: input.contractTitle, fileUrl: input.contractFileUrl }
          : undefined,
      });
      return { success: true };
    } catch {
      throw new ZSAError("ERROR", "Failed to create user app");
    }
  });
