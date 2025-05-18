"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { UserNav } from "@/components/user-nav"
import { useSession } from "next-auth/react"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { Search } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"

export function SiteHeader() {
  const pathname = usePathname()
  const t = useTranslations("Navigation")
  const { data: session } = useSession()
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { href: "/tutorials", label: t("tutorials") },
    { href: "/snippets", label: t("snippets") },
    { href: "/ai-prompts", label: t("aiPrompts") },
    { href: "/topics", label: t("topics") },
    { href: "/community", label: t("community") },
    { href: "/about", label: t("about") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <SidebarToggle />
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <motion.div
              className="h-6 w-6 rounded-full bg-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <span className="hidden font-bold sm:inline-block">Next.js Knowledge Library</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname?.startsWith(item.href) ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
          <LanguageSelector />
          <ThemeToggle />
          {session ? (
            <UserNav user={session.user} />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/api/auth/signin">{t("signIn")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
