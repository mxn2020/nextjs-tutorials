import { getMessages } from "@/lib/get-messages"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: {
    default: "Next.js Knowledge Library",
    template: "%s | Next.js Knowledge Library",
  },
  description: "A multilingual Next.js learning platform with AI integration and community collaboration",
  keywords: ["Next.js", "React", "JavaScript", "TypeScript", "Web Development", "Tutorials"],
  authors: [{ name: "Next.js Knowledge Library Team" }],
  openGraph: {
    title: "Next.js Knowledge Library",
    description: "A multilingual Next.js learning platform with AI integration and community collaboration",
    url: "https://nextjs-knowledge-library.vercel.app",
    siteName: "Next.js Knowledge Library",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default async function RootLayout({ children, params }) {
  const messages = await getMessages(params?.locale || "en")

  return (
    <ClientLayout params={params} messages={messages}>
      {children}
    </ClientLayout>
  )
}


import './globals.css'