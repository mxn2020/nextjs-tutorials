import "server-only"
import { locales, defaultLocale } from "./i18n/constants"

const dictionaries: Record<string, () => Promise<any>> = Object.fromEntries(
  locales.map((locale) => [
    locale,
    () => import(`../dictionaries/${locale}.json`).then((module) => module.default),
  ])
)

export const getDictionary = async (locale: string) => {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]()
  }
  return dictionaries[locale]()
}
