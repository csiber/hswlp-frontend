import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import AppsClient from "./apps.client";
import { getAllAppsAsync } from "@/lib/db/apps";
import type { App } from "@/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Apps – HSWLP",
  description:
    "Discover all official apps built on the HSWLP platform. Shell apps, Pages, VR worlds and more.",
};

export default async function AppsPage() {
  const apps: App[] = await getAllAppsAsync();
  return <AppsClient apps={apps} />;
}
