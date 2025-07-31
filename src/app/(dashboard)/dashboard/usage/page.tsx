import { getSessionFromCookie } from "@/utils/auth"
import { getUserStats } from "@/server/user-stats"

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
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-4">Usage overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4 bg-muted">
          <h2 className="text-lg font-semibold mb-2">Credits</h2>
          <p className="text-2xl">{user.credits} credits</p>
        </div>
        <div className="rounded-lg border p-4 bg-muted">
          <h2 className="text-lg font-semibold mb-2">Active applications</h2>
          <p className="text-2xl">{user.activeApps}</p>
        </div>
        <div className="rounded-lg border p-4 bg-muted">
          <h2 className="text-lg font-semibold mb-2">Storage usage</h2>
          <p className="text-2xl">{user.storageUsage} MB</p>
        </div>
      </div>
    </div>
  )
}
