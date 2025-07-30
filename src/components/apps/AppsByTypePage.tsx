import type { App } from "@/db/schema";
import AppsClient from "@/app/(marketing)/apps/apps.client";
import { getAppsByType } from "@/lib/db/apps";

interface Props {
  type: string;
}

export default async function AppsByTypePage({ type }: Props) {
  const apps: App[] = await getAppsByType(type);
  return <AppsClient apps={apps} />;
}
