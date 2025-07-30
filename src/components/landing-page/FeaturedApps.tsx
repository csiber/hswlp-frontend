import "server-only";
import FeaturedAppsClient from "./FeaturedApps.client";
import { getFeaturedApps } from "@/lib/db/apps";
import type { App } from "@/db/schema";

export default async function FeaturedApps() {
  const apps: App[] = await getFeaturedApps(4);
  return <FeaturedAppsClient apps={apps} />;
}
