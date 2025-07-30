import { PageHeader } from "@/components/page-header";
import { DashboardTiles } from "@/components/dashboard/dashboard-tiles.client";
import { getSessionFromCookie } from "@/utils/auth";
import { getUserStats } from "@/server/user-stats";

export default async function Page() {
  const session = await getSessionFromCookie();
  const stats = session ? await getUserStats(session.user.id) : null;

  return (
    <>
      <PageHeader
        items={[
          {
            href: "/dashboard",
            label: "Dashboard",
          },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardTiles stats={stats} />
      </div>
    </>
  );
}
