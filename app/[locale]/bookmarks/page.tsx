import { getDictionary } from "@/lib/i18n/server"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserBookmarks } from "@/lib/actions/bookmark-actions"
import { BookmarksList } from "@/components/bookmarks-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const dictionary = await getDictionary(locale)
  const bookmarksDict = dictionary.Bookmarks || {
    title: "Bookmarks",
    description: "Your saved bookmarks.",
    meta: { title: "Bookmarks", description: "Your saved bookmarks." }
  }
  return {
    title: bookmarksDict.meta?.title || bookmarksDict.title,
    description: bookmarksDict.meta?.description || bookmarksDict.description,
  }
}

export default async function BookmarksPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/auth/signin")
  }
  const dictionary = await getDictionary(params.locale)
  const bookmarksDict = dictionary.Bookmarks || {
    title: "Bookmarks",
    description: "Your saved bookmarks."
  }
  const bookmarks = await getUserBookmarks(session.user.email as string)
  return (
    <div className="container max-w-6xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>{bookmarksDict.title}</CardTitle>
          <CardDescription>{bookmarksDict.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <BookmarksList bookmarks={bookmarks} />
        </CardContent>
      </Card>
    </div>
  )
}
