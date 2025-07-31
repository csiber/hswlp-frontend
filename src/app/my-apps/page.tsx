import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Route, Metadata } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import type { App } from "@/db/schema";
import { BASE_METADATA } from "@/lib/base-metadata";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "My Applications",
};

export default async function MyAppsPage() {
  const session = await getSessionFromCookie();
  if (!session) {
    redirect("/auth/login");
  }
  const apps: App[] = [];

  return (
    <>
      <PageHeader items={[{ href: "/my-apps", label: "My Applications" }]} />
      <div className="container mx-auto px-5 pb-12">
        {apps.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-dashed border-2">
              <CardHeader>
                <CardTitle>Start from a template</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button asChild>
                  <Link href={"/templates" as Route}>Browse templates</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-dashed border-2">
              <CardHeader>
                <CardTitle>Request a custom project</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button asChild>
                  <Link href={"/start" as Route}>Request now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
