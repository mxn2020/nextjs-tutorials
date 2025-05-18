"use client"

import { usePathname, useRouter } from "next/navigation"
import { locales } from "@/lib/i18n/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSwitcherProps {
  locale: string
  label: string
}

export default function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    // Replace the current locale in the path with the new one
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc === "en" ? "English" : loc === "fr" ? "Français" : "Español"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
