"use client";

import DocsCard from "./DocsCard";
import {
  BookOpenIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

import type { Route } from "next";

const sections = [
  {
    title: "Getting Started",
    subtitle: "Start here to launch your first app on HSWLP.",
    href: "/docs/getting-started" as Route,
    icon: BookOpenIcon,
  },
  {
    title: "Shell App",
    subtitle: "Build full-stack Workers apps using D1, R2 and KV.",
    href: "/docs/shell" as Route,
    icon: CommandLineIcon,
  },
  {
    title: "Deploy Guide",
    subtitle: "Steps to publish your site to Cloudflare Pages.",
    href: "/docs/deploy" as Route,
    icon: RocketLaunchIcon,
  },
  {
    title: "API Reference",
    subtitle: "Explore HSWLP's endpoints and integrations.",
    href: "/docs/api" as Route,
    icon: CodeBracketIcon,
  },
];

export default function DocsGrid() {
  if (sections.length === 0) {
    return (
      <p className="text-center text-muted-foreground">Coming soon...</p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {sections.map(section => (
        <DocsCard key={section.href} {...section} />
      ))}
    </div>
  );
}
