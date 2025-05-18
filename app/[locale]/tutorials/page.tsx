import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getLatestContent } from "@/lib/content"
import { TutorialsList } from "@/components/tutorials-list"
import { TutorialsFilter } from "@/components/tutorials-filter"

export const metadata = {
  title: "Tutorials",
  description: "Browse our collection of Next.js tutorials and guides",
}

export default async function TutorialsPage() {
  const tutorials = await getLatestContent(12)

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-16 border-b"></div>}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1 container py-12">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold">Tutorials</h1>
            <p className="text-muted-foreground mt-2">Browse our collection of Next.js tutorials and guides</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <Suspense fallback={<div className="h-[600px] bg-muted/20 rounded-lg"></div>}>
              <TutorialsFilter />
            </Suspense>
            <Suspense fallback={<div className="h-[800px] bg-muted/20 rounded-lg"></div>}>
              <TutorialsList tutorials={tutorials} />
            </Suspense>
          </div>
        </div>
      </main>
      <Suspense fallback={<div className="h-24 border-t"></div>}>
        <SiteFooter />
      </Suspense>
    </div>
  )
}
