import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppBySlugAsync, getAllAppsAsync } from "@/lib/db/apps";
import { Button } from "@/components/ui/button";
import type { App } from "@/db/schema";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const apps = await getAllAppsAsync();
  return apps.map(app => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlugAsync(slug);
  return {
    title: app ? `${app.name} – HSWLP` : "App – HSWLP",
    description: app?.description,
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const app: App | undefined = await getAppBySlugAsync(slug);
  if (!app) return notFound();
  return (
    <div className="pb-12">
      <section className="py-12 px-4 text-center space-y-4">
        <h1 className="text-4xl font-bold">{app.name}</h1>
        {app.description && (
          <p className="text-muted-foreground text-lg">{app.description}</p>
        )}
      </section>
      {(app.url) && (
        <section className="max-w-3xl mx-auto px-4 mt-8">
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <a href={app.url} target="_blank" rel="noopener noreferrer">
                Visit
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/apps">Back to apps</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
