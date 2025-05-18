import "server-only"
import { locales, defaultLocale } from "./constants"

const dictionaries = {
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../../dictionaries/fr.json").then((module) => module.default),
  es: () => import("../../dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]()
  }
  return dictionaries[locale]()
}
