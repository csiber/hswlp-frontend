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
    <Link href={`/apps/${app.slug}` as Route} className="block h-full">
      <motion.div
        whileHover={{
          y: -5,
          transition: { duration: 0.2 },
        }}
        className="h-full"
        layout
      >
        <Card
          className={cn(
            "group relative cursor-pointer h-full flex flex-col justify-between overflow-hidden transition-all duration-300",
            "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50",
            "bg-card/50 backdrop-blur-sm border-muted-foreground/10",
            app.featured && "border-primary/40 bg-primary/5 shadow-lg shadow-primary/5"
          )}
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  {app.logo_url ? (
                    <Image
                      src={app.logo_url}
                      alt={`${app.name} logo`}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-2xl">{icon}</span>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  {app.name}
                </CardTitle>
              </div>
              {app.featured && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {shortDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 flex items-center justify-between pt-0">
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-muted-foreground/20 group-hover:border-primary/30 transition-colors">
                {app.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {app.repo_url && (
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  onClick={e => {
                    e.stopPropagation();
                    window.open(app.repo_url, "_blank", "noopener,noreferrer");
                  }}
                >
                  <GithubIcon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
