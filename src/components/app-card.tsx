"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { SiGithub as GithubIcon } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AppInfo {
  name: string;
  slug: string;
  description: string;
  tagline?: string;
  status: "active" | "dev" | "planned";
  type: "shell" | "pages" | "vr" | "nas" | "tools" | "creative";
  category: string[];
  logo_url?: string;
  url?: string;
  repo_url?: string;
  github_url?: string;
  tech?: string[];
  features?: string[];
  shell_required?: boolean;
  media?: string[];
  author?: string;
  release_date?: string;
  docs_url?: string;
  featured?: boolean;
}

export const categoryMap: Record<AppInfo["type"] | "all", { label: string; icon: string }> = {
  all: { label: "All", icon: "🌐" },
  shell: { label: "Shell", icon: "\uD83E\uDDCA" },
  pages: { label: "Pages", icon: "\uD83E\uDDE9" },
  vr: { label: "VR", icon: "\uD83D\uDD76\uFE0F" },
  nas: { label: "NAS", icon: "\uD83E\uDDF1" },
  tools: { label: "Tools", icon: "\uD83D\uDD27" },
  creative: { label: "Creative", icon: "\uD83C\uDFA8" },
};


export function AppCard({ app }: { app: AppInfo }) {
  const icon = categoryMap[app.type]?.icon || "";
  const shortDescription =
    app.description.length > 100
      ? app.description.slice(0, 100) + "…"
      : app.description;

  return (
    <Link href={`/apps/${app.slug}` as Route}>
      <motion.div whileHover={{ scale: 1.05 }} layout>
        <Card
          className={cn(
            "cursor-pointer h-full flex flex-col justify-between",
            app.featured && "border-2 border-primary"
          )}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              {app.logo_url && (
                <Image
                  src={app.logo_url}
                  alt={`${app.name} logo`}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              )}
              <CardTitle>{app.name}</CardTitle>
            </div>
            <CardDescription>{shortDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Badge variant="outline" className="capitalize">
              {icon}
            </Badge>
            {app.repo_url && (
              <a
                href={app.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
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
