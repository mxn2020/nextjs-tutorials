"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Bookmark, ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { toggleBookmark } from "@/lib/actions/bookmark-actions"

interface BookmarksListProps {
  bookmarks: any[]
}

export function BookmarksList({ bookmarks }: BookmarksListProps) {
  const t = useTranslations("Bookmarks")
  const { toast } = useToast()
  const [items, setItems] = useState(bookmarks || [])
  const [isRemoving, setIsRemoving] = useState<Record<string, boolean>>({})

  if (!bookmarks) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full rounded-md" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">{t("noBookmarks")}</h3>
        <p className="text-muted-foreground mb-6">{t("startBookmarking")}</p>
        <Button asChild>
          <Link href="/tutorials">{t("exploreTutorials")}</Link>
        </Button>
      </div>
    )
  }

  const handleRemoveBookmark = async (id: string) => {
    setIsRemoving((prev) => ({ ...prev, [id]: true }))

    try {
      await toggleBookmark(id)
      setItems(items.filter((item) => item.contentId !== id))

      toast({
        title: t("removed"),
        description: t("bookmarkRemoved"),
      })
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorRemoving"),
        variant: "destructive",
      })
    } finally {
      setIsRemoving((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((bookmark) => {
        const content = bookmark.content
        if (!content) return null

        return (
          <motion.div
            key={bookmark.contentId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">{content.title}</CardTitle>
                    <CardDescription>
                      {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBookmark(bookmark.contentId)}
                    disabled={isRemoving[bookmark.contentId]}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{t("remove")}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-32 w-full mb-4 rounded-md overflow-hidden">
                  <Image
                    src={
                      content.image ||
                      `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(content.title)}`
                    }
                    alt={content.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm line-clamp-2">{content.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/${content.type}/${content.slug}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("viewContent")}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
