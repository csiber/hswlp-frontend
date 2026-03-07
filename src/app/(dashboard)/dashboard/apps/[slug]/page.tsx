import { getAppBySlugAsync } from "@/lib/db/apps";
import { getSessionFromCookie } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { AppShell } from "./_components/app-shell.client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AppPage({ params }: PageProps) {
  const session = await getSessionFromCookie();
  if (!session) redirect("/sign-in");

  const { slug } = await params;
  const app = await getAppBySlugAsync(slug);

  if (!app) return notFound();

  return (
    <>
      <PageHeader
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/my-apps", label: "My Apps" },
          { href: `/dashboard/apps/${slug}`, label: app.name },
        ]}
      />
      <div className="flex flex-1 flex-col p-4 pt-0 overflow-hidden">
        <AppShell app={app} />
      </div>
    </>
  );
}
