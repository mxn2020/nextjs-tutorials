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
      <SiteHeader />
      <main className="flex-1">
        <ContributionGuide />
        <div className="container py-12">
          <ContributorsList />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
