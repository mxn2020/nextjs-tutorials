import { ReactNode } from "react"
import ClientLayout from "../ClientLayout"
import { getMessages } from "@/lib/get-messages"

interface LocaleLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const messages = await getMessages(params.locale)
  return <ClientLayout params={params} messages={messages}>{children}</ClientLayout>
}
