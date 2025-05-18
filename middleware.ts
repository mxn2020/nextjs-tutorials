import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const locales = ["en", "es", "fr", "de", "ja", "it", "pt", "ar", "el", "nl"]
const defaultLocale = "en"

function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Get the preferred locale from localStorage if available
  const preferredLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (preferredLocale && locales.includes(preferredLocale)) {
    languages = [preferredLocale, ...languages]
  }

  return matchLocale(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is for an API route or static asset
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    // Check if the user is authorized for protected routes
    if (pathname.includes("/admin") || pathname.includes("/dashboard")) {
      const token = await getToken({ req: request })

      if (!token || token.role !== "admin") {
        const url = new URL("/auth/signin", request.url)
        url.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(url)
      }
    }

    return NextResponse.next()
  }

  // Redirect if there is no locale
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)

  // Copy the search params
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value)
  })

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
