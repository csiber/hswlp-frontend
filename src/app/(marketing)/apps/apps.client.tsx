"use client";

import { AppCard, AppInfo } from "@/components/app-card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function AppsClient({ apps }: { apps: AppInfo[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const q = query.toLowerCase();
      const matchesSearch =
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q);
      const matchesType = type === "all" || app.type === type;
      const matchesStatus = status === "all" || app.status === status;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [apps, query, type, status]);

  return (
    <div className="p-4 space-y-4">
      <Input
        placeholder="Search apps..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="flex flex-wrap gap-4">
        <ToggleGroup
          type="single"
          value={type}
          onValueChange={val => setType(val || "all")}
          className="flex gap-2"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="pages">🧩 Pages</ToggleGroupItem>
          <ToggleGroupItem value="shell">🧊 Shell</ToggleGroupItem>
          <ToggleGroupItem value="vr">🕶️ VR</ToggleGroupItem>
          <ToggleGroupItem value="nas">🧱 NAS</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          type="single"
          value={status}
          onValueChange={val => setStatus(val || "all")}
          className="flex gap-2"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="active">✅ Active</ToggleGroupItem>
          <ToggleGroupItem value="dev">⚙️ Dev</ToggleGroupItem>
          <ToggleGroupItem value="planned">⏳ Planned</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredApps.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No apps found.
          </p>
        ) : (
          filteredApps.map(app => <AppCard key={app.slug} app={app} />)
        )}
      </motion.div>
    </div>
  );
}
