import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AIPromptsList } from "@/components/ai-prompts-list"
import { AIPromptsIntro } from "@/components/ai-prompts-intro"

export const metadata = {
  title: "AI Prompts",
  description: "Explore our collection of AI prompts for Next.js development",
}

export default function AIPromptsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-16 border-b"></div>}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1">
        <Suspense fallback={<div className="h-[400px] bg-muted/50"></div>}>
          <AIPromptsIntro />
        </Suspense>
        <div className="container py-12">
          <Suspense fallback={<div className="h-[800px] bg-muted/20 rounded-lg"></div>}>
            <AIPromptsList />
          </Suspense>
        </div>
      </main>
      <Suspense fallback={<div className="h-24 border-t"></div>}>
        <SiteFooter />
      </Suspense>
    </div>
  )
}
