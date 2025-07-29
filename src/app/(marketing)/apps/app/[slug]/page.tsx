import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { AppInfo } from "@/components/app-card";
import { motion } from "framer-motion";
import Link from "next/link";

const STATUS_LABELS: Record<AppInfo["status"], string> = {
  active: "✅ active",
  dev: "⚙️ dev",
  planned: "⏳ planned",
};

const TYPE_ICONS: Record<AppInfo["type"], string> = {
  shell: "\uD83E\uDDCA", // 🧊
  pages: "\uD83E\uDDE9", // 🧩
  vr: "\uD83D\uDD76\uFE0F", // 🕶️
  nas: "\uD83E\uDDF1", // 🧱
};

interface AppsData {
  categories: { id: string; name: string }[];
  apps: AppInfo[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const { apps } = appsData as AppsData;
  return apps.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { apps } = appsData as AppsData;
  const app = apps.find(a => a.slug === slug);
  return {
    title: app ? app.name : "App",
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const { apps, categories } = appsData as AppsData;
  const app = apps.find(a => a.slug === slug);
  if (!app) return notFound();
  const catNames = app.category
    .map(id => categories.find(c => c.id === id)?.name ?? id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <Card className="prose dark:prose-invert max-w-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{TYPE_ICONS[app.type]}</span>
            {app.name}
            <Badge variant="secondary" className="ml-2 capitalize">
              {STATUS_LABELS[app.status]}
            </Badge>
          </CardTitle>
          <CardDescription>{app.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {app.logo_url && (
            <img
              src={app.logo_url}
              alt={`${app.name} logo`}
              className="w-32 h-32 object-contain"
            />
          )}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Categories:</span> {catNames.join(", ")}
          </div>
          {app.type === "pages" && (
            <p className="text-sm text-orange-600">
              This is a static app hosted on a subdomain.
            </p>
          )}
          {app.type === "shell" && (
            <p className="text-sm text-orange-600">
              This is a full-featured Cloudflare Worker app with database & storage.
            </p>
          )}
        </CardContent>
        {(app.url || app.repo_url || app.docs_url) && (
          <CardFooter className="flex flex-wrap gap-2">
            {app.url && (
              <Button asChild>
                <Link href={app.url}>Try now</Link>
              </Button>
            )}
            {app.repo_url && (
              <Button asChild variant="outline">
                <Link href={app.repo_url}>GitHub</Link>
              </Button>
            )}
            {app.docs_url && (
              <Button asChild variant="outline">
                <Link href={app.docs_url}>Documentation</Link>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
      <div className="mt-8 space-y-4">
        {/* changelog placeholder */}
        {/* ratings placeholder */}
        {/* screenshots placeholder */}
      </div>
    </motion.div>
  );
}
