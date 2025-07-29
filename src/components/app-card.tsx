"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { SiGithub as GithubIcon } from "@icons-pack/react-simple-icons";

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

const STATUS_LABELS: Record<AppInfo["status"], string> = {
  active: "\u2705 active",
  dev: "\u2699\uFE0F dev",
  planned: "\u23F3 planned",
};

export function AppCard({ app }: { app: AppInfo }) {
  const icon = ICONS[app.type] || "";
  const shortDescription =
    app.description.length > 100
      ? app.description.slice(0, 100) + "…"
      : app.description;

  return (
    <Link href={`/apps/app/${app.slug}` as Route}>
      <motion.div whileHover={{ scale: 1.05 }} layout>
        <Card className="cursor-pointer h-full flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{icon}</span>
              {app.name}
            </CardTitle>
            <CardDescription>{shortDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {STATUS_LABELS[app.status]}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {icon}
              </Badge>
            </div>
            {app.repo_url && (
              <a
                href={app.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
