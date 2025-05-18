"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function getUserProfile(email: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be signed in to view profiles")
  }

  try {
    const { db } = await connectToDatabase()

    const profile = await db.collection("profiles").findOne({ email })

    if (!profile) {
      // Create a default profile if none exists
      const defaultProfile = {
        email,
        bio: "",
        location: "",
        website: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await db.collection("profiles").insertOne(defaultProfile)
      return defaultProfile
    }

    return profile
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw new Error("Failed to fetch user profile")
  }
}

export async function updateUserProfile(email: string, data: any) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || session.user.email !== email) {
    throw new Error("You can only update your own profile")
  }

  try {
    const { db } = await connectToDatabase()

    const profile = await db.collection("profiles").findOne({ email })

    if (!profile) {
      // Create a new profile
      await db.collection("profiles").insertOne({
        email,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } else {
      // Update existing profile
      await db.collection("profiles").updateOne(
        { email },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
          },
        },
      )
    }

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw new Error("Failed to update user profile")
  }
}

export async function getUserSettings(email: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be signed in to view settings")
  }

  try {
    const { db } = await connectToDatabase()

    const settings = await db.collection("settings").findOne({ email })

    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = {
        email,
        language: "en",
        theme: "system",
        autoplayVideos: false,
        showCodeLineNumbers: true,
        notifications: {
          emailNotifications: true,
          newContent: true,
          contentUpdates: true,
          comments: true,
          mentions: true,
          newsletter: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await db.collection("settings").insertOne(defaultSettings)
      return defaultSettings
    }

    return settings
  } catch (error) {
    console.error("Error getting user settings:", error)
    throw new Error("Failed to fetch user settings")
  }
}

export async function updateUserSettings(email: string, data: any) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || session.user.email !== email) {
    throw new Error("You can only update your own settings")
  }

  try {
    const { db } = await connectToDatabase()

    const settings = await db.collection("settings").findOne({ email })

    if (!settings) {
      // Create new settings
      await db.collection("settings").insertOne({
        email,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } else {
      // Update existing settings
      await db.collection("settings").updateOne(
        { email },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
          },
        },
      )
    }

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    console.error("Error updating user settings:", error)
    throw new Error("Failed to update user settings")
  }
}

export async function updateNotificationSettings(email: string, data: any) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || session.user.email !== email) {
    throw new Error("You can only update your own notification settings")
  }

  try {
    const { db } = await connectToDatabase()

    const settings = await db.collection("settings").findOne({ email })

    if (!settings) {
      // Create new settings with notifications
      await db.collection("settings").insertOne({
        email,
        notifications: data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } else {
      // Update existing notification settings
      await db.collection("settings").updateOne(
        { email },
        {
          $set: {
            notifications: data,
            updatedAt: new Date(),
          },
        },
      )
    }

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    console.error("Error updating notification settings:", error)
    throw new Error("Failed to update notification settings")
  }
}

export async function getUserActivity(email: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be signed in to view activity")
  }

  try {
    const { db } = await connectToDatabase()

    // Get user activity from various collections
    const bookmarks = await db
      .collection("bookmarks")
      .find({ userId: email })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    // Format bookmarks as activity items
    const bookmarkActivities = bookmarks.map((bookmark) => ({
      id: bookmark._id.toString(),
      type: "bookmark",
      userId: bookmark.userId,
      contentId: bookmark.contentId,
      content: { title: bookmark.content?.title || "Unknown content" },
      timestamp: bookmark.createdAt,
    }))

    // In a real app, you would fetch more activity types like views, likes, comments, etc.
    // For now, we'll just return bookmarks as activity

    return bookmarkActivities
  } catch (error) {
    console.error("Error getting user activity:", error)
    return []
  }
}

export async function exportUserData(email: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || session.user.email !== email) {
    throw new Error("You can only export your own data")
  }

  try {
    const { db } = await connectToDatabase()

    // Get user data from various collections
    const profile = await db.collection("profiles").findOne({ email })
    const settings = await db.collection("settings").findOne({ email })
    const bookmarks = await db.collection("bookmarks").find({ userId: email }).toArray()

    // Compile all user data
    const userData = {
      profile: profile || {},
      settings: settings || {},
      bookmarks: bookmarks || [],
      exportDate: new Date(),
    }

    return userData
  } catch (error) {
    console.error("Error exporting user data:", error)
    throw new Error("Failed to export user data")
  }
}

export async function deleteUserAccount(email: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || session.user.email !== email) {
    throw new Error("You can only delete your own account")
  }

  try {
    const { db } = await connectToDatabase()

    // Delete user data from various collections
    await db.collection("users").deleteOne({ email })
    await db.collection("profiles").deleteOne({ email })
    await db.collection("settings").deleteOne({ email })
    await db.collection("bookmarks").deleteMany({ userId: email })

    return { success: true }
  } catch (error) {
    console.error("Error deleting user account:", error)
    throw new Error("Failed to delete user account")
  }
}
