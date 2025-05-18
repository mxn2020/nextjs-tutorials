"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"
import { locales, localeNames } from "@/lib/i18n/constants"

interface LanguageSelectorProps {
  locale: string
  label: string
}

export function LanguageSelector({ locale, label }: LanguageSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (languageCode: string) => {
    localStorage.setItem("preferredLanguage", languageCode);

    // Replace the current locale in the path with the new one
    const newPath = pathname.replace(new RegExp(`^/(${locales.join("|")})`), `/${languageCode}`)

    console.log("New path:", newPath)
    // Update the URL without reloading the page
    router.push(newPath)
    setIsOpen(false);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Select language</span>
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={locale === loc ? "bg-muted font-medium" : ""}
          >
            {localeNames[loc] || loc}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
