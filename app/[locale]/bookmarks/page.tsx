import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserBookmarks } from "@/lib/actions/bookmark-actions"
import { BookmarksList } from "@/components/bookmarks-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Bookmarks" })

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  }
}

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations("Bookmarks")

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const bookmarks = await getUserBookmarks(session.user.email as string)

  return (
    <div className="container max-w-6xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <BookmarksList bookmarks={bookmarks} />
        </CardContent>
      </Card>
    </div>
  )
}
