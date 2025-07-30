"use client"

import { type ComponentType, useEffect, useState } from "react"
import type { Route } from 'next'

import {
  Building2,
  AppWindow,
  Boxes,
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  CreditCard,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
  teams: {
    name: string
    logo: ComponentType
    plan: string
  }[]
  navMain: NavMainItem[]
  apps: NavItem[]
}

// TODO Add a theme switcher
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStore();
  const [formattedTeams, setFormattedTeams] = useState<Data['teams']>([]);
  const [navItems, setNavItems] = useState<NavMainItem[]>([]);

  // Map session teams to the format expected by TeamSwitcher
  useEffect(() => {
    if (session?.teams && session.teams.length > 0) {
      // Map teams from session to the format expected by TeamSwitcher
      const teamData = session.teams.map(team => {
        return {
          name: team.name,
          // TODO Get the actual logo when we implement team avatars
          logo: Building2,
          // Default plan - you might want to add plan data to your team structure
          plan: team.role.name || "Member"
        };
      });

      setFormattedTeams(teamData);
    }
  }, [session]);

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
        title: "Teams",
        url: "/teams",
        icon: Users,
      },
      {
        title: "Marketplace",
        url: "/marketplace",
        icon: ShoppingCart,
      },
      {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
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
    teams: formattedTeams,
    navMain: navItems,
    apps: [],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {data?.teams?.length > 0 && (
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
      )}

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
