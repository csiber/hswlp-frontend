"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";

export interface AppInfo {
  name: string;
  slug: string;
  description: string;
  status: "active" | "dev" | "planned";
  type: "shell" | "pages" | "vr" | "nas";
  category: string[];
  logo_url?: string;
  url?: string;
  repo_url?: string;
  docs_url?: string;
}

const ICONS: Record<AppInfo["type"], string> = {
  shell: "\uD83E\uDDCA", // 🧊
  pages: "\uD83E\uDDE9", // 🧩
  vr: "\uD83D\uDD76\uFE0F", // 🕶️
  nas: "\uD83E\uDDF1", // 🧱
};

export function AppCard({ app }: { app: AppInfo }) {
  const icon = ICONS[app.type] || "";
  return (
    <Link href={`/apps/app/${app.slug}` as Route}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Card className="cursor-pointer h-full flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{icon}</span>
              {app.name}
            </CardTitle>
            <CardDescription>{app.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="capitalize">{app.status}</Badge>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
