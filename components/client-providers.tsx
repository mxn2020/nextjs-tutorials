"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { IntlProvider } from "@/components/intl-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SidebarProvider } from "@/components/sidebar-provider";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
  locale: string;
  dictionary: any;
}

export function ClientProviders({ children, locale, dictionary }: ClientProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <IntlProvider locale={locale} messages={dictionary} timeZone="UTC">
          <MotionProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </MotionProvider>
          <Toaster />
        </IntlProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
