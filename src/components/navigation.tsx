"use client"

import Link from "next/link"
import type { Route } from 'next'
import { usePathname } from "next/navigation"
import { Menu } from 'lucide-react'
import HswlpLogo from '@/components/hswlp-logo'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSessionStore } from "@/state/session"
import { cn } from "@/lib/utils"
import { useNavStore } from "@/state/nav"
import { Skeleton } from "@/components/ui/skeleton"
import NavUserMenu from "@/components/nav-user-menu"
import { SITE_NAME } from "@/constants"

type NavItem = {
  name: string;
  href: Route;
}

const ActionButtons = () => {
  const { setIsOpen } = useNavStore()

  return <NavUserMenu onNavigate={() => setIsOpen(false)} />
}

export function Navigation() {
  const { isLoading } = useSessionStore()
  const { isOpen, setIsOpen } = useNavStore()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: "Apps", href: "/apps" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
    { name: "Contact", href: "/contact" },
  ]

  const isActiveLink = (itemHref: string) => {
    if (itemHref === "/") {
      return pathname === "/"
    }
    return pathname === itemHref || pathname.startsWith(`${itemHref}/`)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-muted-foreground/10 bg-background/60 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="group text-xl md:text-2xl font-bold text-primary flex items-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <HswlpLogo className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="tracking-tight">{SITE_NAME}</span>
            </Link>
          </div>

          <div className="hidden lg:flex md:items-center md:space-x-8">
            <div className="flex items-center space-x-1">
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ) : (
                navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-all rounded-full hover:bg-muted/50 relative group",
                      isActiveLink(item.href) && "text-foreground bg-muted/50"
                    )}
                  >
                    {item.name}
                    {isActiveLink(item.href) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))
              )}
            </div>
            
            <div className="h-6 w-px bg-muted-foreground/20 mx-2" />
            
            <ActionButtons />
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <ActionButtons />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-l border-muted-foreground/10 bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col h-full pt-16 px-6">
                  <div className="space-y-4">
                    {isLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ) : (
                      navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center h-14 px-4 text-xl font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-2xl transition-all",
                            isActiveLink(item.href) && "text-foreground bg-muted/50"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))
                    )}
                  </div>
                  
                  <div className="mt-auto pb-12">
                     {/* Mobile footer or extra info */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

