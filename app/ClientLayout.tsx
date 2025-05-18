"use client"

import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { NextIntlClientProvider } from "next-intl"
import { Analytics } from "@/components/analytics"
import { SidebarProvider } from "@/components/sidebar-provider"
import { MotionConfig } from "framer-motion"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export default function ClientLayout({ children, params, messages }) {
  const locale = params?.locale || "en"

  // Check if the current language is RTL
  const isRTL = locale === "ar"

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <MotionConfig reducedMotion="user">
                  <SidebarProvider>{children}</SidebarProvider>
                </MotionConfig>
                <Toaster />
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
