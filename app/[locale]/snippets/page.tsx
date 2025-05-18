import { getDictionary } from "@/lib/i18n/server"
import type { Metadata } from "next"


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  const termsDictionary = dictionary.Snippets || {
    title: "Snippets",
    description: "Explore our collection of code snippets and examples.",
  }

  return {
    title: termsDictionary.title,
    description: termsDictionary.description,
  }
}

export default async function SnippetsPage({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale)
  const termsDictionary = dictionary.Snippets || {
    title: "Snippets",
    description: "Explore our collection of code snippets and examples.",
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{termsDictionary.title}</h1>
      <p className="text-xl text-muted-foreground mb-10">{termsDictionary.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-2">useDebounce</h2>
          <p className="text-muted-foreground mb-4">A custom React hook to debounce state updates.</p>
          <a href="/en/snippets/use-debounce-hook" className="text-primary hover:underline">
            View snippet →
          </a>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-2">useIntersectionObserver</h2>
          <p className="text-muted-foreground mb-4">A custom React hook for lazy loading and infinite scrolling.</p>
          <a href="/en/snippets/use-intersection-observer" className="text-primary hover:underline">
            View snippet →
          </a>
        </div>
      </div>
    </div>
  )
}
