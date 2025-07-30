"use client";
import { motion } from "framer-motion";
import { AppCard } from "@/components/apps/AppCard";
import type { App } from "@/db/schema";

interface Props {
  apps: App[];
}

export function FeaturedApps({ apps }: Props) {
  const featured = apps.filter(app => app.featured === 1).slice(0, 4);

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
