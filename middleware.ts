import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createI18nMiddleware } from "next-intl/server"
import { locales, defaultLocale } from "./config"

// Create the i18n middleware
const i18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
})

export default async function middleware(request: NextRequest) {
  // Skip middleware for API routes to prevent interference with NextAuth
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Apply i18n middleware for non-API routes
  return i18nMiddleware(request)
}

export const config = {
  // Matcher for all paths except API routes and specific static files
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
