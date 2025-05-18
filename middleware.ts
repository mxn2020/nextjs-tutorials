import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { locales, defaultLocale } from "./lib/i18n/constants"

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || ""
  const preferredLocale = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim())
    .find((lang) => locales.includes(lang.substring(0, 2)))

  return preferredLocale ? preferredLocale.substring(0, 2) : defaultLocale
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip static assets and API routes immediately
  if (pathname.startsWith("/_next") || 
      pathname.startsWith("/api") || 
      pathname.includes(".")) {
    return NextResponse.next()
  }

  // Handle root redirect first (/) - prioritize this check
  if (pathname === "/") {
    const preferred = request.cookies.get("NEXT_LOCALE")?.value
    const locale = (preferred && locales.includes(preferred)) ? preferred : defaultLocale
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Check for locale in pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // Add locale to path if missing
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  // Authorization check for protected routes
  if (pathname.includes("/admin") || pathname.includes("/dashboard")) {
    try {
      const token = await getToken({ req: request })
      if (!token || token.role !== "admin") {
        const url = new URL("/auth/signin", request.url)
        url.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error("Auth token validation error:", error)
      // Fall through to next() if token validation fails
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}