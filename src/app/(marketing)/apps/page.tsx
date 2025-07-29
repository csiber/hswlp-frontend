import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { AppInfo } from "@/components/app-card";
import AppsClient from "./apps.client";

interface AppsData {
  categories: { id: string; name: string }[];
  apps: AppInfo[];
}

export const metadata: Metadata = {
  title: "Apps",
  description: "All available apps",
};

export default function AppsPage() {
  const { apps } = appsData as AppsData;
  return <AppsClient apps={apps} />;
}
