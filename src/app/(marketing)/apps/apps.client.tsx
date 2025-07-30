"use client";

import { AppCard } from "@/components/apps/AppCard";
import CategoryFilter from "@/components/apps/CategoryFilter";
import type { App } from "@/db/schema";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export default function AppsClient({ apps }: { apps: App[] }) {
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    return Array.from(
      new Set(apps.map(a => a.category).filter((c): c is string => Boolean(c)))
    ).sort();
  }, [apps]);

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      return category === "all" || app.category === category;
    });
  }, [apps, category]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredApps.length === 0 ? (
          <p className="col-span-full flex flex-col items-center gap-2 text-center text-muted-foreground">
            <Sparkles className="h-5 w-5" />
            No apps found.
          </p>
        ) : (
          filteredApps.map(app => <AppCard key={app.id} app={app} />)
        )}
      </motion.div>
    </div>
  );
}
