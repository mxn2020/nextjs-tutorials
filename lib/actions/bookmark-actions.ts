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

// Add the missing getUserBookmarks export
export async function getUserBookmarks(userId?: string) {
  const session = await getServerSession(authOptions)

  if (!userId && !session?.user?.email) {
    return []
  }

  // Use provided userId or fall back to session user email
  const userIdentifier = userId || session?.user?.email

  try {
    const { db } = await connectToDatabase()

    const bookmarks = await db
      .collection("bookmarks")
      .find({ userId: userIdentifier })
      .sort({ createdAt: -1 })
      .toArray()

    // Return just the content IDs for compatibility with existing code
    return bookmarks.map((bookmark) => bookmark.contentId)
  } catch (error) {
    console.error("Error getting user bookmarks:", error)
    return []
  }
}

export async function getBookmarks() {
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

export async function removeUserBookmark(bookmarkId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return { success: false, message: "You must be logged in to remove bookmarks" }
  }

  try {
    const { db } = await connectToDatabase()

    // Remove from bookmarks collection
    const result = await db.collection("bookmarks").deleteOne({
      userId: session.user.email,
      contentId: bookmarkId,
    })

    const success = result.deletedCount > 0

    return { success, message: success ? "Bookmark removed" : "Failed to remove bookmark" }
  } catch (error) {
    console.error("Error removing user bookmark:", error)
    return { success: false, message: "Failed to remove bookmark" }
  }
}
