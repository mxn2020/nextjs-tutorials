"use client";
import { NextIntlClientProvider } from "next-intl";

export function IntlProvider({ locale, messages, children, timeZone }: { locale: string; messages: any; children: React.ReactNode; timeZone?: string }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} {...(timeZone ? { timeZone } : {})}>
      {children}
    </NextIntlClientProvider>
  );
}
