"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import type { Route } from "next";
import type { NavMainItem } from "./app-sidebar";

type Props = {
  items: NavMainItem[];
};

export function NavMain({ items }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>HSWLP Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // If there are no child items, render a direct link
          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.tooltip ?? item.title}>
                  <Link href={item.url as Route}>
                    {item.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.iconUrl} alt="" className="h-4 w-4 mr-2" />
                    ) : (
                      item.icon && React.createElement(item.icon as React.ElementType, { className: "mr-2" })
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Otherwise render the collapsible menu
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.tooltip ?? item.title}>
                    {item.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.iconUrl} alt="" className="h-4 w-4 mr-2" />
                    ) : (
                      item.icon && React.createElement(item.icon as React.ElementType, { className: "mr-2" })
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild tooltip={subItem.tooltip ?? subItem.title}>
                          {subItem.url.startsWith("/") ? (
                            <Link href={subItem.url as Route}>
                              {subItem.iconUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={subItem.iconUrl} alt="" className="h-4 w-4 mr-2" />
                              ) : (
                                subItem.icon &&
                                  React.createElement(subItem.icon as React.ElementType, {
                                    className: "mr-2",
                                  })
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          ) : (
                            <a href={subItem.url}>
                              {subItem.iconUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={subItem.iconUrl} alt="" className="h-4 w-4 mr-2" />
                              ) : (
                                subItem.icon &&
                                  React.createElement(subItem.icon as React.ElementType, {
                                    className: "mr-2",
                                  })
                              )}
                              <span>{subItem.title}</span>
                            </a>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
