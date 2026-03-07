"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollShadow } from '@heroui/react'
import {
  User,
  Smartphone,
  Lock,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import type { Route } from "next";
import useSignOut from "@/hooks/useSignOut";
import { motion } from "framer-motion";

interface SidebarNavItem {
  title: string;
  href: Route;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Profile",
    href: "/settings",
    icon: User,
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: Lock,
  },
  {
    title: "Sessions",
    href: "/settings/sessions",
    icon: Smartphone,
  },
  {
    title: "Change Password",
    href: "/forgot-password",
    icon: Lock,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();
  const isLgAndSmaller = useMediaQuery('LG_AND_SMALLER')
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { signOut } = useSignOut();

  return (
    <ScrollShadow
      className="w-full lg:w-auto whitespace-nowrap pb-4"
      orientation="horizontal"
      isEnabled={isLgAndSmaller}
    >
      <nav className="flex items-center lg:items-stretch min-w-full gap-2 lg:flex-col lg:gap-1">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "group-hover:text-foreground")} />
                <span>{item.title}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-settings-nav"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <ChevronRight className={cn("h-4 w-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 hidden lg:block", isActive && "opacity-100 translate-x-0")} />
            </Link>
          )
        })}

        <div className="h-px bg-muted-foreground/10 my-4 hidden lg:block" />

        <Dialog>
          <DialogTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all mt-4 lg:mt-0 font-medium"
              )}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-3xl border-muted-foreground/10 bg-background/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Log out?</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Are you sure you want to end your current session?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-8 flex gap-3">
              <DialogClose ref={dialogCloseRef} asChild>
                <Button variant="ghost" className="rounded-xl h-12 flex-1">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                className="rounded-xl h-12 flex-1 font-bold shadow-lg shadow-red-500/20"
                onClick={() => {
                  signOut();
                  dialogCloseRef.current?.click();
                }}
              >
                End Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </nav>
    </ScrollShadow>
  );
}
