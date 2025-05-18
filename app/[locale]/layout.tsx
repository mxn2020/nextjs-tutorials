// app/[locale]/layout.tsx
import type React from "react";
import { Suspense } from "react";
import { getDictionary } from "@/lib/i18n/server";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/sidebar-provider";
import { MotionProvider } from "@/components/motion-provider";
import { Analytics } from "@/components/analytics";
import { SiteHeader } from "@/components/site-header"; // Import the SiteHeader
import { IntlProvider } from "@/components/intl-provider";

import "@/styles/globals.css";
import { SiteFooter } from "@/components/site-footer";

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
    { locale: "es" },
    { locale: "de" },
    { locale: "it" },
    { locale: "pt" },
    { locale: "ar" },
    { locale: "el" },
    { locale: "nl" },
    { locale: "ja" },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale); // Fetched on the server

  const footerText = dictionary.Footer?.copyright || `© ${new Date().getFullYear()} Next.js Knowledge Library`;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <IntlProvider locale={locale} messages={dictionary} timeZone="UTC">
                <MotionProvider>
                  <SidebarProvider>
                    <div className="min-h-screen flex flex-col">
                      <SiteHeader locale={locale} dictionary={dictionary} />
                      <main className="flex-1 container mx-auto py-8how can we fix this error: px-4">
                        {children}
                      </main>


                      <Suspense fallback={<footer className="border-t py-4">
                        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                          {footerText}
                        </div>
                      </footer>}>
                        <SiteFooter />
                      </Suspense>
                    </div>
                  </SidebarProvider>
                </MotionProvider>
                <Toaster />
              </IntlProvider>
            </ThemeProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}