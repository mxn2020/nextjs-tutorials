import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContributionGuide } from "@/components/contribution-guide"
import { ContributorsList } from "@/components/contributors-list"

export const metadata = {
  title: "Contribute",
  description: "Join our community of contributors and help build the Next.js Knowledge Library",
}

export default function ContributePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-16 border-b"></div>}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1">
        <Suspense fallback={<div className="h-[500px] bg-muted/50"></div>}>
          <ContributionGuide />
        </Suspense>
        <div className="container py-12">
          <Suspense fallback={<div className="h-[800px] bg-muted/20 rounded-lg"></div>}>
            <ContributorsList />
          </Suspense>
        </div>
      </main>
      <Suspense fallback={<div className="h-24 border-t"></div>}>
        <SiteFooter />
      </Suspense>
    </div>
  )
}
