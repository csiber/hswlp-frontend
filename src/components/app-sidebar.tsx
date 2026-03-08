"use client"

import { type ComponentType, useEffect, useState } from "react"
import type { Route } from 'next'
import * as Icons from "lucide-react"

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
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSessionStore } from "@/state/session"
import HswlpLogo from "@/components/hswlp-logo"
import Link from "next/link"
import { SITE_NAME } from "@/constants"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStore();
  const [navItems, setNavItems] = useState<NavMainItem[]>([]);

  useEffect(() => {
    setNavItems([
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
        title: "Back to Home",
        url: "/",
        icon: Rocket,
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
              ? { ...item, items: allApps.map(app => {
                  const IconComponent = app.icon ? (Icons[app.icon as keyof typeof Icons] as ComponentType) : undefined;
                  return {
                    title: app.name,
                    url: `/apps/${app.slug}`,
                    icon: IconComponent,
                    tooltip: app.description ?? undefined,
                  };
                }) }
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
    <Sidebar 
      collapsible="icon" 
      className="border-r border-muted-foreground/10 bg-background/50 backdrop-blur-xl"
      {...props}
    >
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-muted-foreground/5 px-4">
        <Link href="/" className="flex items-center gap-3 w-full group overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
            <HswlpLogo className="h-7 w-7" />
          </div>
          <div className="flex flex-col overflow-hidden transition-all duration-300">
            <span className="truncate font-bold text-lg leading-none tracking-tight">
              {SITE_NAME}
            </span>
            <span className="truncate text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
              Cloud Console
            </span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="py-4 px-2">
        <NavMain items={data.navMain} />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-muted-foreground/5 p-4">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
