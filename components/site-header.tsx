// component/site-header.tsx
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
import { Dictionary } from "@/types/dictionary"

export function SiteHeader({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [searchOpen, setSearchOpen] = useState(false)

  const languageLabel = dictionary?.languageSwitcher?.label || "Select language:";

  const navItems = [
    { href: "/tutorials", label: dictionary.Navigation.tutorials },
    { href: "/snippets", label: dictionary.Navigation.snippets },
    { href: "/ai-prompts", label: dictionary.Navigation.aiPrompts },
    { href: "/topics", label: dictionary.Navigation.topics },
    { href: "/community", label: dictionary.Navigation.community },
    { href: "/about", label: dictionary.Navigation.about },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-row items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-16">
        {/* Left Group: Sidebar Toggle & Logo */}
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <SidebarToggle />
          <Link href="/" className="ml-2 sm:ml-4 mr-2 md:mr-4 flex items-center space-x-2 min-w-0">
            <motion.div
              className="h-6 w-6 rounded-full bg-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <span className="hidden font-bold sm:inline-block truncate">Next.js Knowledge Library</span>
          </Link>
        </div>

        {/* Center Group: Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 justify-center">
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
                  "text-lg font-large transition-colors hover:text-primary px-2 py-1 rounded",
                  pathname?.startsWith(item.href) ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Group: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 justify-end min-w-0">
          <Button variant="outline" size="icon" className="hidden md:flex" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
          <LanguageSelector locale={locale} label={languageLabel} />
          <ThemeToggle />
          {session && session.user ? (
            <UserNav user={session.user} />
          ) : (
            <Button variant="default" size="sm" className="btn">
              <Link href="/api/auth/signin">{dictionary.Navigation.signIn}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}