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

  // i18n: Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (!pathnameHasLocale && !pathname.startsWith("/_next") && !pathname.startsWith("/api") && !pathname.includes(".")) {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // Redirect root / to preferred language or default locale
  if (pathname === "/") {
    const preferred = request.cookies.get("NEXT_LOCALE")?.value
    const locale = (preferred && locales.includes(preferred)) ? preferred : defaultLocale
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Check if the pathname is for an API route or static asset
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

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

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
