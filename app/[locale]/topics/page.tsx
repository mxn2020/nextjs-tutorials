import { getDictionary } from "@/lib/i18n/server"
import type { Metadata } from "next"
import Link from "next/link"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  return {
    title: dictionary.Topics.title,
    description: dictionary.Topics.description,
  }
}

export default async function TopicsPage({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale)
  const t = (key: keyof typeof dictionary.Topics) => dictionary.Topics[key]

  const topics = [
    {
      title: "Routing",
      description: "Learn about Next.js file-based routing system.",
      slug: "routing",
    },
    {
      title: "Data Fetching",
      description: "Explore different ways to fetch data in Next.js.",
      slug: "data-fetching",
    },
    {
      title: "Styling",
      description: "Different approaches for styling your Next.js application.",
      slug: "styling",
    },
    {
      title: "Optimization",
      description: "Optimize your Next.js application for better performance.",
      slug: "optimization",
    },
    {
      title: "Deployment",
      description: "Learn how to deploy your Next.js application.",
      slug: "deployment",
    },
    {
      title: "Authentication",
      description: "Implement authentication in your Next.js application.",
      slug: "authentication",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="text-xl text-muted-foreground mb-10">{t("description")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/${params.locale}/topics/${topic.slug}`}
            className="group border rounded-lg p-6 bg-card hover:bg-accent transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">{topic.title}</h2>
            <p className="text-muted-foreground">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
