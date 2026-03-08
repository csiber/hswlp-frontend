import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getDB } from "@/db";
import { userTable, appTable, creditTransactionTable } from "@/db/schema";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Boxes, Activity, Coins, ShieldAlert, ArrowUpRight } from "lucide-react";
import { count, desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Route } from "next";

export default async function AdminDashboard() {
  const session = await getSessionFromCookie();
  
  if (!session || session.user.role !== 'admin') {
    return redirect('/dashboard');
  }

  const db = getDB();
  
  // Fetch statistics
  const [userCount] = await db.select({ value: count() }).from(userTable);
  const [appCount] = await db.select({ value: count() }).from(appTable);
  const [transactionCount] = await db.select({ value: count() }).from(creditTransactionTable);
  
  const recentUsers = await db.query.userTable.findMany({
    orderBy: [desc(userTable.createdAt)],
    limit: 5
  });

  const stats = [
    { title: "Total Users", value: userCount.value, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Apps", value: appCount.value, icon: Boxes, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Transactions", value: transactionCount.value, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "System Role", value: "ADMIN", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <>
      <PageHeader
        items={[
          { href: "/admin", label: "Admin Console" },
          { href: "/admin", label: "Overview" },
        ]}
      />
      
      <div className="container mx-auto px-6 pb-12 space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight">System Overview</h1>
            <Badge className="bg-red-500/10 text-red-500 border-red-500/20 uppercase font-black px-3">Live</Badge>
          </div>
          <p className="text-muted-foreground text-lg">Central management console for the HSWLP platform.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-black tracking-tight">Recent Registrations</CardTitle>
              <CardDescription>Newest users joined in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-muted-foreground/5 hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{user.nickname || user.email}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{user.role}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-black uppercase bg-background/50">
                      {user.currentCredits} CR
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <CardHeader>
              <CardTitle className="text-xl font-black tracking-tight text-primary">Admin Quick Actions</CardTitle>
              <CardDescription>System management and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl justify-between group">
                <Link href={"/admin/apps" as Route}>
                  <span className="flex items-center gap-3">
                    <Boxes className="h-5 w-5 text-purple-500" />
                    Manage Ecosystem Applications
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl justify-between group">
                <Link href={"/admin/users" as Route}>
                  <span className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    Global User Management
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl justify-between group">
                <Link href={"/admin/transactions" as Route}>
                  <span className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-emerald-500" />
                    Financial & Credit Logs
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
