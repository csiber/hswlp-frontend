import { PageHeader } from "@/components/page-header";
import { Card, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata, Route } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { BASE_METADATA } from "@/lib/base-metadata";
import { Rocket, Plus, ExternalLink, Settings } from "lucide-react";

type AppStatus = "active" | "paused" | "developing";

interface MyApp {
  id: string;
  slug: string;
  name: string;
  icon: string;
  status: AppStatus;
  url: string;
  description: string;
}

const badgeVariant: Record<AppStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  active: "secondary",
  paused: "destructive",
  developing: "outline",
};

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "My Applications",
};

export default async function MyAppsPage() {
  const session = await getSessionFromCookie();
  if (!session) redirect("/sign-in");

  // Virtual apps for demo purposes since database might be empty
  const apps: MyApp[] = [
    {
      id: 'v1',
      slug: 'shareai',
      name: 'ShareAI',
      icon: '🔐',
      status: 'active',
      url: '/dashboard/apps/shareai',
      description: 'Secure AI-powered file sharing'
    },
    {
      id: 'v2',
      slug: 'talk',
      name: 'Talk',
      icon: '💬',
      status: 'active',
      url: '/dashboard/apps/talk',
      description: 'AI Chat Assistant'
    },
    {
      id: 'v3',
      slug: 'devshell',
      name: 'DevShell',
      icon: '🐚',
      status: 'active',
      url: '/dashboard/apps/devshell',
      description: 'Cloud Terminal'
    },
    {
      id: 'v4',
      slug: 'nas',
      name: 'NAS',
      icon: '📂',
      status: 'active',
      url: '/dashboard/apps/nas',
      description: 'Cloud Storage'
    },
    {
      id: 'v5',
      slug: 'builder',
      name: 'Builder',
      icon: '🏗️',
      status: 'active',
      url: '/dashboard/apps/builder',
      description: 'Canvas App Builder'
    }
  ];

  return (
    <>
      <PageHeader items={[{ href: "/my-apps", label: "My Applications" }]} />
      <div className="container mx-auto px-6 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Your Apps</h1>
            <p className="text-muted-foreground">Manage and monitor your deployed instances</p>
          </div>
          <Button asChild className="rounded-full shadow-lg shadow-primary/20">
            <Link href={"/apps" as Route}>
              <Plus className="mr-2 h-4 w-4" /> New Application
            </Link>
          </Button>
        </div>

        {apps.length === 0 ? (
          <Card className="border-dashed border-2 bg-muted/5 py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <Rocket className="h-10 w-10 text-primary opacity-20" />
            </div>
            <CardTitle className="text-2xl font-bold">No applications found</CardTitle>
            <CardDescription className="max-w-sm mt-2 text-base">
              You haven&apos;t deployed any applications yet. Browse the marketplace or start from a template.
            </CardDescription>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="rounded-xl">
                <Link href={"/apps" as Route}>Explore Marketplace</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <Link href={"/dashboard/templates" as Route}>Use a Template</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apps.map(app => (
              <Card key={app.id} className="group overflow-hidden border-muted-foreground/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {app.icon}
                    </div>
                    <Badge variant={badgeVariant[app.status]} className="capitalize">
                      {app.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold mt-4">{app.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{app.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-2 pt-4">
                  <Button asChild variant="default" size="sm" className="flex-1 rounded-lg">
                    <Link href={`/dashboard/apps/${app.slug}` as Route}>
                      <ExternalLink className="mr-2 h-3.5 w-3.5" /> Launch
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="px-3 rounded-lg">
                    <Link href={`/dashboard/apps/${app.slug}` as Route}>
                      <Settings className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
