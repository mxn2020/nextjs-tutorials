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
      <SiteHeader />
      <main className="flex-1">
        <AIPromptsIntro />
        <div className="container py-12">
          <AIPromptsList />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
