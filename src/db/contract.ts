import { getDB } from "./index";
import { contractTable } from "./schema";
import { eq } from "drizzle-orm";

export async function getContractsByUser(userId: string) {
  const db = getDB();
  return db.query.contractTable.findMany({
    where: eq(contractTable.userId, userId),
    orderBy: (contracts, { desc }) => [desc(contracts.createdAt)],
  });
}

export type { Contract } from "./schema";
