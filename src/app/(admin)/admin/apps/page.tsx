import { PageHeader } from "@/components/page-header";
import { getAppsAction } from "@/actions/app-admin-actions";
import { useServerAction } from "zsa-react";
import { useEffect } from "react";
import type { App } from "@/db/schema";

export default function AdminAppsPage() {
  const { execute, data } = useServerAction(getAppsAction);
  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="container mx-auto py-10 px-6">
      <PageHeader items={[{ href: "/admin/apps", label: "Apps" }]} />
      <h1 className="text-3xl font-bold mb-4">Apps</h1>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.apps.map((app: App) => (
            <li key={app.id} className="border p-4 rounded-md">
              <div className="font-semibold">{app.name}</div>
              <div className="text-sm text-muted-foreground">{app.slug}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
