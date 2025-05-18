import { getDictionary } from "@/lib/i18n/server"
import type { Metadata } from "next"

import Link from "next/link"

export async function generateMetadata({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { q?: string }
}): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  const searchDict = dictionary.Search || {
    title: "Search",
    description: "Search the site.",
    searchResults: "Results",
    resultCount: {
      one: "1 result for {query}",
      other: "{count} results for {query}",
    },
    noResults: "No results found",
    tryDifferentQuery: "Try a different search.",
    enterQuery: "Enter a search query.",
  }
  return {
    title: searchParams.q
      ? `${searchDict.searchResults}: ${searchParams.q}`
      : searchDict.title,
    description: searchDict.description,
  }
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams: { q?: string }
}) {
  const dictionary = await getDictionary(params.locale)
  const searchDict = dictionary.Search || {
    title: "Search",
    description: "Search the site.",
    searchResults: "Results",
    resultCount: {
      one: "1 result for {query}",
      other: "{count} results for {query}",
    },
    noResults: "No results found",
    tryDifferentQuery: "Try a different search.",
    enterQuery: "Enter a search query.",
  }
  const query = searchParams.q || ""

  // This would be replaced with actual search logic in a production app
  // For now, we'll just show some mock results based on the query
  const getSearchResults = (query: string) => {
    if (!query) return []

    // Mock results for demonstration
    const allResults = [
      {
        title: "Getting Started with Next.js App Router",
        type: "Tutorial",
        url: "/en/tutorials/getting-started-with-nextjs-app-router",
        excerpt: "Learn how to create your first Next.js application using the new App Router...",
      },
      {
        title: "Data Fetching in Next.js",
        type: "Tutorial",
        url: "/en/tutorials/data-fetching-in-nextjs",
        excerpt: "Explore the different ways to fetch data in Next.js applications...",
      },
      {
        title: "Next.js Image Component Reference",
        type: "Reference",
        url: "/en/references/next-image-component",
        excerpt: "Complete API reference for the Next.js Image component...",
      },
      {
        title: "Understanding React Server Components",
        type: "Explanation",
        url: "/en/explanations/understanding-server-components",
        excerpt: "A deep dive into React Server Components and how they work in Next.js...",
      },
      {
        title: "useDebounce Hook",
        type: "Snippet",
        url: "/en/snippets/use-debounce-hook",
        excerpt: "A custom React hook to debounce state updates...",
      },
    ]

    return allResults.filter(
      (result) =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const searchResults = getSearchResults(query)

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-2">{query ? searchDict.searchResults : searchDict.title}</h1>

      {query && (
        <p className="text-xl text-muted-foreground mb-10">
          {searchResults.length === 1
            ? searchDict.resultCount.one.replace("{query}", query)
            : searchDict.resultCount.other.replace("{count}", searchResults.length.toString()).replace("{query}", query)}
        </p>
      )}

      {!query && <p className="text-xl text-muted-foreground mb-10">{searchDict.enterQuery}</p>}

      {searchResults.length > 0 ? (
        <div className="space-y-6">
          {searchResults.map((result, index) => (
            <div key={index} className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-muted">{result.type}</span>
              </div>
              <Link href={result.url}>
                <h2 className="text-xl font-semibold hover:text-primary transition-colors">{result.title}</h2>
              </Link>
              <p className="text-muted-foreground mt-2">{result.excerpt}</p>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">{searchDict.noResults}</h2>
          <p className="text-muted-foreground">{searchDict.tryDifferentQuery}</p>
        </div>
      ) : null}
    </div>
  )
}
