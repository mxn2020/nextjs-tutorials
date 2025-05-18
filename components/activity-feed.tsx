"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { formatDistanceToNow } from "date-fns"
import { Bookmark, Eye, MessageSquare, ThumbsUp } from "lucide-react"
import { getUserActivity } from "@/lib/actions/user-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ActivityFeedProps {
  userId: string
}

export function ActivityFeed({ userId }: ActivityFeedProps) {
  const t = useTranslations("Profile.activity")
  const [activities, setActivities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await getUserActivity(userId)
        setActivities(data)
      } catch (error) {
        console.error("Failed to fetch user activity:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [userId])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t("noActivity")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div
            className={cn(
              "p-2 rounded-full",
              activity.type === "view" && "bg-blue-100 text-blue-600",
              activity.type === "bookmark" && "bg-purple-100 text-purple-600",
              activity.type === "like" && "bg-red-100 text-red-600",
              activity.type === "comment" && "bg-green-100 text-green-600",
            )}
          >
            {activity.type === "view" && <Eye className="h-5 w-5" />}
            {activity.type === "bookmark" && <Bookmark className="h-5 w-5" />}
            {activity.type === "like" && <ThumbsUp className="h-5 w-5" />}
            {activity.type === "comment" && <MessageSquare className="h-5 w-5" />}
          </div>

          <div>
            <p className="font-medium">
              {activity.type === "view" && t("viewedContent")}
              {activity.type === "bookmark" && t("bookmarkedContent")}
              {activity.type === "like" && t("likedContent")}
              {activity.type === "comment" && t("commentedContent")}{" "}
              <span className="font-bold">{activity.content.title}</span>
            </p>

            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
