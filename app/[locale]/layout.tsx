import type React from "react"
import { getDictionary } from "@/lib/i18n/server"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/sidebar-provider"
import { MotionConfig } from "framer-motion"
import { Suspense } from "react"

import "@/app/globals.css"
import { Analytics } from "@/components/analytics"

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "es" }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  const dictionary = await getDictionary(locale)

  return (
    <html lang={locale}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <MotionConfig reducedMotion="user">
                <SidebarProvider>{children}</SidebarProvider>
              </MotionConfig>
              <Toaster />

            </ThemeProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
