import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface Contract {
  title: string;
  status: "active" | "completed" | "pending";
  createdAt: string;
}

const contracts: Contract[] = [
  { title: "Webstudio full package", status: "active", createdAt: "2024-04-01" },
  { title: "Landing + Builder", status: "completed", createdAt: "2024-02-15" },
  { title: "DevShell Mini", status: "pending", createdAt: "2024-05-20" },
];

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

export default function ContractsPage() {
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
          <p className="text-center text-muted-foreground">You have no contracts yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((contract) => (
              <Card key={contract.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{contract.title}</CardTitle>
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
