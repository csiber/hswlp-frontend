import { PageHeader } from "@/components/page-header";
import { UserAppsTable } from "./_components/user-apps-table";
import type { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Client Applications",
  description: "Manage client apps",
};

export default function AdminUserAppsPage() {
  return (
    <>
      <PageHeader items={[{ href: "/admin/my-apps", label: "Client Apps" }]} />
      <UserAppsTable />
    </>
  );
}
