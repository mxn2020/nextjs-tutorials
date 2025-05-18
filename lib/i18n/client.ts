import { locales, defaultLocale } from "./constants"

const dictionaries = {
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../../dictionaries/fr.json").then((module) => module.default),
  es: () => import("../../dictionaries/es.json").then((module) => module.default),
  de: () => import("../../dictionaries/de.json").then((module) => module.default),
  it: () => import("../../dictionaries/it.json").then((module) => module.default),
  pt: () => import("../../dictionaries/pt.json").then((module) => module.default),
  ar: () => import("../../dictionaries/ar.json").then((module) => module.default),
  el: () => import("../../dictionaries/el.json").then((module) => module.default),
  nl: () => import("../../dictionaries/nl.json").then((module) => module.default),
  ja: () => import("../../dictionaries/ja.json").then((module) => module.default),
}

export const localeNames: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ar: "العربية",
  el: "Ελληνικά",
  nl: "Nederlands",
  ja: "日本語",
}

export const getDictionary = async (locale: string) => {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]()
  }
  return dictionaries[locale]()
}
