import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Snippets" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function SnippetsPage() {
  const t = await getTranslations("Snippets")

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="text-xl text-muted-foreground mb-10">{t("description")}</p>

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
