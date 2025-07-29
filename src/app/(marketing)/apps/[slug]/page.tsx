import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { AppInfo } from "@/components/app-card";
import Link from "next/link";
import Image from "next/image";

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
  tools: "\uD83D\uDD27", // 🛠️
  creative: "\uD83C\uDFA8", // 🎨
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
    title: app ? `${app.name} – HSWLP` : "App – HSWLP",
    description: app?.description,
    openGraph: app?.media && app.media.length > 0 ? {
      images: [app.media[0]],
    } : undefined,
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
    <div className="pb-12">
      {/* Hero */}
      <section className="py-12 px-4 text-center space-y-4">
        {app.logo_url && (
          <Image
            src={app.logo_url}
            alt={`${app.name} logo`}
            width={80}
            height={80}
            className="mx-auto h-20 w-20 object-contain"
          />
        )}
        <div className="flex justify-center gap-2">
          {catNames.map(name => (
            <Badge key={name} variant="secondary" className="capitalize">
              {name}
            </Badge>
          ))}
          <Badge variant="outline" className="capitalize">
            {TYPE_ICONS[app.type]}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          {app.name}
          <Badge variant="secondary" className="capitalize">
            {STATUS_LABELS[app.status]}
          </Badge>
        </h1>
        <p className="text-muted-foreground text-lg">
          {app.tagline || app.description}
        </p>
      </section>

      {/* Details */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="prose dark:prose-invert max-w-none">
          <p>{app.description}</p>
        </div>

        {app.tech && (
          <div>
            <h2 className="font-medium">Technologies</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {app.tech.map(t => (
                <Badge key={t} variant="outline" className="capitalize">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {app.features && (
          <div>
            <h2 className="font-medium">Features</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {app.features.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {app.shell_required && (
          <p className="text-sm">Requires shell access 🧊</p>
        )}
      </section>

      {/* Media */}
      {app.media && app.media.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 mt-8 space-y-4">
          <h2 className="font-medium">Preview</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {app.media.slice(0, 3).map(src => (
              <Image
                key={src}
                src={src}
                alt={`${app.name} screenshot`}
                width={800}
                height={450}
                className="rounded-lg border"
              />
            ))}
          </div>
        </section>
      )}

      {/* Credits */}
      {(app.author || app.github_url || app.release_date) && (
        <section className="max-w-3xl mx-auto px-4 mt-8 space-y-2 text-sm">
          {app.author && <p>Created by {app.author}</p>}
          {app.release_date && <p>Released on {app.release_date}</p>}
          {app.github_url && (
            <p>
              <a href={app.github_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                Open source
              </a>
            </p>
          )}
        </section>
      )}

      {/* Buttons */}
      {(app.url || app.github_url) && (
        <section className="max-w-3xl mx-auto px-4 mt-8">
          <div className="flex flex-wrap gap-2">
            {app.url && (
              <Button asChild>
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  Try it now
                </a>
              </Button>
            )}
            {app.github_url && (
              <Button asChild variant="outline">
                <a href={app.github_url} target="_blank" rel="noopener noreferrer">
                  View source
                </a>
              </Button>
            )}
            <Button asChild variant="secondary">
              <Link href="/apps">Back to all apps</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
