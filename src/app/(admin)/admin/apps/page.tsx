import { PageHeader } from "@/components/page-header";
import { AppsTable } from "./_components/apps-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Management",
  description: "Manage all apps",
};

export default function AppsPage() {
  return (
    <>
      <PageHeader items={[{ href: "/admin/apps", label: "Apps" }]} />
      <AppsTable />
    </>
  );
}
