import { PageHeader } from "@/components/page-header";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata, Route } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { BASE_METADATA } from "@/lib/base-metadata";

type AppStatus = "active" | "paused" | "developing";

interface MyApp {
  name: string;
  icon: string;
  status: AppStatus;
  url: string;
}

const dummyApps: MyApp[] = [
  { name: "Yumekai", icon: "🎨", status: "active", url: "https://yumekai.app" },
  { name: "Blogocska", icon: "📝", status: "paused", url: "https://blogocska.hu" },
  { name: "IdeaBoard", icon: "💡", status: "developing", url: "https://ideaboard.hu" },
];

const badgeVariant: Record<AppStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  active: "secondary",
  paused: "destructive",
  developing: "outline",
};

const badgeClass: Record<AppStatus, string> = {
  active: "bg-green-600 text-white hover:bg-green-700",
  paused: "",
  developing: "",
};

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "My Applications",
};

export default async function MyAppsPage() {
  const session = await getSessionFromCookie();
  if (!session) redirect("/auth/login");

  const apps = dummyApps; // TODO: fetch from database

  return (
    <>
      <PageHeader items={[{ href: "/my-apps", label: "My Applications" }]} />
      <div className="container mx-auto px-5 pb-12">
        {apps.length === 0 ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">You don&apos;t have any apps yet.</p>
            <Button asChild>
              <Link href={"/apps" as Route}>Explore apps</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apps.map(app => (
              <Card key={app.name} className="flex flex-col gap-4 p-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-2xl">{app.icon}</span>
                  {app.name}
                </CardTitle>
                <CardContent className="flex items-end justify-between gap-2">
                  <Badge variant={badgeVariant[app.status]} className={badgeClass[app.status]}>
                    {app.status}
                  </Badge>
                  <Button asChild size="sm">
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      Open
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
