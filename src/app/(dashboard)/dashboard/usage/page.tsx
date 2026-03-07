import { getSessionFromCookie } from "@/utils/auth"
import { getUserStats } from "@/server/user-stats"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Coins, Boxes, HardDrive, Activity, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

async function getCurrentUser() {
  const session = await getSessionFromCookie()
  if (!session) {
    return {
      credits: 0,
      activeApps: 0,
      storageUsage: 0,
    }
  }
  const stats = await getUserStats(session.user.id)
  return {
    credits: stats.currentCredits,
    activeApps: stats.activeApps,
    storageUsage: stats.storageUsage,
  }
}

export default async function UsagePage() {
  const user = await getCurrentUser()
  
  const stats = [
    {
      title: "Available Credits",
      value: user.credits.toLocaleString(),
      unit: "CR",
      description: "Ready to use for all services",
      icon: Coins,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Active Instances",
      value: user.activeApps.toLocaleString(),
      unit: "APPS",
      description: "Currently running applications",
      icon: Boxes,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Storage Allocated",
      value: user.storageUsage.toLocaleString(),
      unit: "MB",
      description: "Total database & file storage",
      icon: HardDrive,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      progress: (user.storageUsage / 512) * 100
    }
  ]

  return (
    <>
      <PageHeader
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/usage", label: "Resource Usage" }
        ]}
      />
      
      <div className="container mx-auto px-6 pb-12 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight">Resource Overview</h1>
          <p className="text-muted-foreground text-lg">Monitor your infrastructure usage and credit consumption in real-time.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <stat.icon className="w-24 h-24" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter">{stat.value}</span>
                  <span className="text-xs font-bold text-muted-foreground">{stat.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                
                {'progress' in stat && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                      <span>Usage</span>
                      <span>{Math.round(stat.progress || 0)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-1000", stat.color.replace('text', 'bg'))} 
                        style={{ width: `${Math.min(stat.progress || 0, 100)}%` }} 
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle>System Health</CardTitle>
              </div>
              <CardDescription>Real-time status of your infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "API Gateway", status: "Operational", color: "text-emerald-500" },
                { label: "D1 Database", status: "Operational", color: "text-emerald-500" },
                { label: "KV Session Store", status: "Operational", color: "text-emerald-500" },
                { label: "R2 Object Storage", status: "Operational", color: "text-emerald-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-muted-foreground/5">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", item.color.replace('text', 'bg'))} />
                    <span className={cn("text-xs font-bold uppercase tracking-tighter", item.color)}>{item.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-amber-500" />
                <CardTitle>Quick Tips</CardTitle>
              </div>
              <CardDescription>Optimize your resource consumption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm leading-relaxed">
                  <strong className="text-primary">Tip:</strong> You can reduce storage usage by cleaning up old deployment logs and temporary build artifacts in your settings.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-sm leading-relaxed">
                  <strong className="text-amber-500">Low Credits?</strong> Set up auto-recharge to ensure your applications never experience downtime due to insufficient balance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
