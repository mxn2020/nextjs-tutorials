import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedContent } from "@/components/featured-content"
import { ContentMatrix } from "@/components/content-matrix"
import { HeroSection } from "@/components/hero-section"
import { getLatestContent } from "@/lib/content"

export const metadata = {
  title: "Home",
  description: "A multilingual Next.js learning platform with AI integration and community collaboration",
}

export default async function HomePage() {
  const latestContent = await getLatestContent(6)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Learn Next.js in your language</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore our comprehensive library of tutorials, guides, and AI-powered learning resources
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Tutorials</CardTitle>
                <CardDescription>Step-by-step guides to master Next.js concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <p>From beginner to advanced, our tutorials cover everything you need to know about Next.js.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/tutorials">Browse Tutorials</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Prompts</CardTitle>
                <CardDescription>AI-powered learning assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use our AI prompts to get help with debugging, extending your projects, or practicing concepts.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/ai-prompts">Explore Prompts</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contribute</CardTitle>
                <CardDescription>Join our community of contributors</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Share your knowledge and help others learn by contributing to our library of resources.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/contribute">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <FeaturedContent content={latestContent} />

        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Content Matrix</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore our content by topic, difficulty, and format
            </p>
          </div>

          <ContentMatrix className="mt-8" />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
