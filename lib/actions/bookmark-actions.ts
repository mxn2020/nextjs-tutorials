"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

export async function toggleBookmark(contentId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be signed in to bookmark content")
  }

  try {
    const { db } = await connectToDatabase()

    // Check if the bookmark already exists
    const existingBookmark = await db.collection("bookmarks").findOne({
      userId: session.user.email,
      contentId,
    })

    if (existingBookmark) {
      // Remove the bookmark
      await db.collection("bookmarks").deleteOne({
        userId: session.user.email,
        contentId,
      })

      return { bookmarked: false }
    } else {
      // Add the bookmark
      await db.collection("bookmarks").insertOne({
        userId: session.user.email,
        contentId,
        createdAt: new Date(),
      })

      return { bookmarked: true }
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error)
    throw new Error("Failed to update bookmark")
  }
}

export async function getUserBookmarks() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return []
  }

  try {
    const { db } = await connectToDatabase()

    const bookmarks = await db
      .collection("bookmarks")
      .find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .toArray()

    // Get the content for each bookmark
    const contentIds = bookmarks.map((bookmark) => bookmark.contentId)

    const content = await db
      .collection("content")
      .find({ _id: { $in: contentIds } })
      .toArray()

    // Map content to bookmarks
    return bookmarks.map((bookmark) => {
      const contentItem = content.find((item) => item._id.toString() === bookmark.contentId)
      return {
        ...bookmark,
        content: contentItem,
      }
    })
  } catch (error) {
    console.error("Error getting user bookmarks:", error)
    return []
  }
}
