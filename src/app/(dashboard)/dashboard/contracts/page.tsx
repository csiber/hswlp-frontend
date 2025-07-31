import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getContractsByUser, type Contract } from "@/db/contract";

function statusBadge(status: Contract["status"]) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-500 text-white hover:bg-green-600 border-transparent">
          Completed
        </Badge>
      );
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    default:
      return <Badge>Active</Badge>;
  }
}

export default async function ContractsPage() {
  const session = await getSessionFromCookie();
  if (!session) {
    redirect("/auth/login");
  }
  const contracts = await getContractsByUser(session.user.id);
  return (
    <>
      <PageHeader
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/contracts", label: "Contracts" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {contracts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            You have no contracts yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((contract) => (
              <Card key={contract.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {contract.title}
                    </CardTitle>
                    {statusBadge(contract.status)}
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="text-sm text-muted-foreground">
                  Created {format(new Date(contract.createdAt), "PPP")}
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild size="sm">
                    <a href="#">View contract</a>
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
