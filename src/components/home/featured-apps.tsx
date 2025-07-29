"use client";
import appsData from "@/data/apps.json";
import { AppCard, AppInfo } from "@/components/app-card";
import { motion } from "framer-motion";

interface AppsData {
  categories: { id: string; name: string }[];
  apps: (AppInfo & { featured?: boolean })[];
}

export function FeaturedApps() {
  const { apps } = appsData as AppsData;
  const featured = apps.filter(app => app.featured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured apps</h2>
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map(app => (
            <AppCard key={app.slug} app={app} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
