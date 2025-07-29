import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { AppInfo } from "@/components/app-card";
import AppsClient from "./apps.client";

interface AppsData {
  categories: { id: string; name: string }[];
  apps: AppInfo[];
}

export const metadata: Metadata = {
  title: "HSWLP Apps – All Projects",
  description:
    "Discover all official apps built on the HSWLP platform. Shell apps, Pages, VR worlds and more.",
};

export default function AppsPage() {
  const { apps } = appsData as AppsData;
  return <AppsClient apps={apps} />;
}
