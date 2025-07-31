import { getDB } from "./index";
import { requestTable } from "./schema";

export async function createRequest(data: {
  name: string;
  email: string;
  projectName?: string | null;
  description: string;
  domainType: string;
  status?: string;
  createdAt?: Date;
}) {
  const db = getDB();
  const [req] = await db.insert(requestTable).values(data).returning();
  return req;
}
