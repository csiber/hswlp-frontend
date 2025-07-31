"use client"

import { type ComponentType, useEffect, useState } from "react"
import type { Route } from 'next'

import {
  Rocket,
  AppWindow,
  Boxes,
  FileText,
  LayoutDashboard,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSessionStore } from "@/state/session"

export type NavItem = {
  title: string
  url: Route | string
  icon?: ComponentType
  iconUrl?: string
  tooltip?: string
}

export type NavMainItem = NavItem & {
  isActive?: boolean
  items?: NavItem[]
}

type Data = {
  user: {
    name: string
    email: string
  }
  navMain: NavMainItem[]
  apps: NavItem[]
}

// TODO Add a theme switcher
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStore();
  const [navItems, setNavItems] = useState<NavMainItem[]>([]);

  useEffect(() => {
    setNavItems([
      {
        title: "Landing",
        url: "/",
        icon: Rocket,
        isActive: true,
      },
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "My Applications",
        url: "/my-apps",
        icon: AppWindow,
      },
      {
        title: "Contracts",
        url: "/contracts",
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
      {
        title: "Applications",
        url: "/apps",
        icon: Boxes,
        items: [],
      },
    ]);
  }, []);

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await fetch('/api/apps');
        const allApps: { slug: string; name: string; icon: string | null; description: string | null }[] = await res.json();
        setNavItems(current =>
          current.map(item =>
            item.title === 'Applications'
              ? { ...item, items: allApps.map(app => ({
                  title: app.name,
                  url: `/apps/${app.slug}`,
                  iconUrl: app.icon ?? undefined,
                  tooltip: app.description ?? undefined,
                })) }
              : item
          )
        );
      } catch (error) {
        console.error('Failed to fetch apps', error);
      }
    }
    fetchApps();
  }, []);

  const data: Data = {
    user: {
      name: session?.user?.nickname || session?.user?.firstName || "User",
      email: session?.user?.email || "user@example.com",
    },
    navMain: navItems,
    apps: [],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
