"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useSidebar } from "@/components/sidebar-provider"
import { BookOpen, Code, Home, Info, LayoutGrid, PenTool, Sparkles, Users, X } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const t = useTranslations("Navigation")
  const { isOpen, close } = useSidebar()

  // Close the sidebar when navigating
  useEffect(() => {
    close()
  }, [pathname, close])

  const navItems = [
    {
      title: t("home"),
      href: "/",
      icon: Home,
    },
    {
      title: t("tutorials"),
      href: "/tutorials",
      icon: BookOpen,
    },
    {
      title: t("topics"),
      href: "/topics",
      icon: LayoutGrid,
    },
    {
      title: t("aiPrompts"),
      href: "/ai-prompts",
      icon: Sparkles,
    },
    {
      title: t("snippets"),
      href: "/snippets",
      icon: Code,
    },
    {
      title: t("community"),
      href: "/community",
      icon: Users,
    },
    {
      title: t("contribute"),
      href: "/contribute",
      icon: PenTool,
    },
    {
      title: t("about"),
      href: "/about",
      icon: Info,
    },
  ]

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  const sidebar = (
    <ScrollArea className="h-full py-6">
      <motion.div className="flex flex-col gap-2 px-4" variants={sidebarVariants} initial="hidden" animate="visible">
        {navItems.map((item, index) => (
          <motion.div key={item.href} variants={itemVariants}>
            <Button asChild variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  )

  return (
    <>
      <aside className={cn("hidden md:flex md:w-[240px] lg:w-[280px] border-r bg-background", className)}>
        {sidebar}
      </aside>
      <AnimatePresence>
        {isOpen && (
          <Sheet open={isOpen} onOpenChange={close}>
            <SheetContent side="left" className="p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary" />
                  <span className="font-bold">Next.js Knowledge Library</span>
                </div>
                <Button variant="ghost" size="icon" onClick={close}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              {sidebar}
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  )
}
