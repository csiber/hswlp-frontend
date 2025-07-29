import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { AppCard, AppInfo } from "@/components/app-card";

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
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {apps.map(app => (
        <AppCard key={app.slug} app={app} />
      ))}
    </div>
  );
}
