"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { toggleBookmark } from "@/lib/actions/bookmark-actions"

interface BookmarkButtonProps {
  id: string
}

export function BookmarkButton({ id }: BookmarkButtonProps) {
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleToggleBookmark = async () => {
    if (!session) {
      router.push("/api/auth/signin")
      return
    }

    setIsPending(true)

    try {
      const result = await toggleBookmark(id)
      setIsBookmarked(result.bookmarked)

      toast({
        title: result.bookmarked ? "Added to bookmarks" : "Removed from bookmarks",
        description: result.bookmarked
          ? "This item has been added to your bookmarks."
          : "This item has been removed from your bookmarks.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark status.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggleBookmark} disabled={isPending} className="h-8 w-8">
      <motion.div
        whileTap={{ scale: 0.9 }}
        animate={isBookmarked ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
      </motion.div>
      <span className="sr-only">{isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}</span>
    </Button>
  )
}
