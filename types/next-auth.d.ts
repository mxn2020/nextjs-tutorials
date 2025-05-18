import type { DefaultSession, DefaultUser } from "next-auth"

// Define user role type
export type UserRole = "admin" | "editor" | "viewer" | "user"

// Define user profile type
export interface UserProfile {
  bio?: string
  location?: string
  website?: string
  joinedAt: Date
  lastActive: Date
  displayName?: string
  avatar?: string
}

// Define user settings type
export interface UserSettings {
  theme: "light" | "dark" | "system"
  emailNotifications: boolean
  contentUpdateNotifications: boolean
  weeklyDigest: boolean
  language: string
  timezone: string
}

// Define bookmark type
export interface UserBookmark {
  id: string
  contentId: string
  contentType: "tutorial" | "reference" | "explanation" | "snippet" | "video" | "prompt"
  title: string
  description?: string
  createdAt: Date
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      profile?: UserProfile
      settings?: UserSettings
      bookmarks?: string[]
    } & DefaultSession["user"]
  }

  // Extend the built-in user types
  interface User extends DefaultUser {
    role?: UserRole
    profile?: UserProfile
    settings?: UserSettings
    bookmarks?: string[]
  }
}

// Extend the JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: UserRole
    profile?: UserProfile
    settings?: UserSettings
    bookmarks?: string[]
  }
}
