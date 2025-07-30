import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Contracts",
};

export default async function ContractsPage() {
  const session = await getSessionFromCookie();
  if (!session) {
    redirect("/auth/login");
  }
  const contracts: any[] = [];

  return (
    <>
      <PageHeader items={[{ href: "/contracts", label: "Contracts" }]} />
      <div className="container mx-auto px-5 pb-12">
        {contracts.length === 0 ? (
          <div className="text-center space-y-4">
            <p>You have not started any project requests yet.</p>
            <Button asChild>
              <Link href="/start">Start now</Link>
            </Button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
