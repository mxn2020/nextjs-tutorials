import type { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import type { UserProfile, UserRole, UserSettings } from "@/types/next-auth"

export interface UserModel {
  _id: ObjectId
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  role: UserRole
  profile: UserProfile
  settings: UserSettings
  bookmarks: string[]
  createdAt: Date
  updatedAt: Date
}

export async function getUserById(userId: string): Promise<UserModel | null> {
  const client = await clientPromise
  const db = client.db()

  const user = await db.collection("users").findOne({ id: userId })
  return user as UserModel | null
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<boolean> {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("users").updateOne(
    { id: userId },
    {
      $set: {
        profile: { ...profile },
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<boolean> {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("users").updateOne(
    { id: userId },
    {
      $set: {
        settings: { ...settings },
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function addBookmark(userId: string, bookmarkId: string): Promise<boolean> {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("users").updateOne(
    { id: userId },
    {
      $addToSet: { bookmarks: bookmarkId },
      $set: { updatedAt: new Date() },
    },
  )

  return result.modifiedCount > 0
}

export async function removeBookmark(userId: string, bookmarkId: string): Promise<boolean> {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("users").updateOne(
    { id: userId },
    {
      $pull: { bookmarks: bookmarkId },
      $set: { updatedAt: new Date() },
    },
  )

  return result.modifiedCount > 0
}

export async function getUserBookmarks(userId: string): Promise<string[]> {
  const client = await clientPromise
  const db = client.db()

  const user = await db.collection("users").findOne({ id: userId }, { projection: { bookmarks: 1 } })

  return user?.bookmarks || []
}
