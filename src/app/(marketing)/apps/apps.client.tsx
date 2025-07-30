"use client";

import { AppCard } from "@/components/apps/AppCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categoryMap } from "@/components/app-card";
import type { App } from "@/db/schema";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export default function AppsClient({ apps }: { apps: App[] }) {
  const [category, setCategory] = useState<string>("all");

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      return category === "all" || app.type === category;
    });
  }, [apps, category]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <ToggleGroup
          type="single"
          value={category}
          onValueChange={val => setCategory(val || "all")}
          className="flex gap-2"
        >
          {Object.entries(categoryMap).map(([id, info]) => (
            <ToggleGroupItem key={id} value={id} className="capitalize">
              {info.icon} {info.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
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
