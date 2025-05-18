import type { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend"
import { connectToDatabase } from "@/lib/mongodb"
import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Debug logger function
const debugLog = (message: string, data?: any) => {
  console.log(`[NextAuth Debug] ${message}`, data ? JSON.stringify(data, null, 2) : "")
}

// Create a properly initialized MongoDB adapter
const getMongoDBAdapter = async () => {
  try {
    debugLog("Initializing MongoDB adapter")
    const { client } = await connectToDatabase()
    
    if (!client) {
      throw new Error("MongoDB connection failed - client instance is undefined")
    }
    
    debugLog("MongoDB connection successful, creating adapter")
    // Return the adapter with the MongoDB client as per the docs
    return MongoDBAdapter(client)
  } catch (error) {
    debugLog("Error initializing MongoDB adapter", error)
    return undefined // Return undefined instead of null to match expected type
  }
}

// Export authOptions as a named export with default configuration
// This is needed for compatibility with existing imports
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM || "noreply@tutorials.coder-verse.io",
      // Use Resend directly instead of SMTP configuration
      async sendVerificationRequest({ identifier, url, provider }) {
        debugLog(`Sending verification email to ${identifier}`)
        debugLog(`Verification URL: ${url}`)

        try {
          debugLog("Attempting to send email via Resend")
          const { data, error } = await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: "Sign in to Next.js Knowledge Library",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333; font-size: 24px; margin-bottom: 24px;">Sign in to Next.js Knowledge Library</h1>
                <p style="margin-bottom: 16px;">Click the link below to sign in to your account:</p>
                <a href="${url}" style="display: inline-block; background-color: #0070f3; color: white; font-weight: 500; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Sign in</a>
                <p style="margin-top: 24px; color: #666; font-size: 14px;">If you didn't request this email, you can safely ignore it.</p>
              </div>
            `,
          })

          if (error) {
            debugLog("Resend API error:", error)
            throw new Error(`Error sending verification email: ${error.message}`)
          }

          debugLog("Email sent successfully", data)
        } catch (error) {
          debugLog("Exception in sendVerificationRequest:", error)
          throw new Error("Failed to send verification email")
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      debugLog("Sign in callback triggered", {
        user: user ? { id: user.id, email: user.email } : null,
        account: account ? { provider: account.provider, type: account.type } : null,
        emailVerified: user?.emailVerified ? "yes" : "no",
      })
      return true
    },
    async redirect({ url, baseUrl }) {
      // Make sure we're using the correct baseUrl in production
      const productionUrl = "https://tutorials.coder-verse.io"
      const effectiveBaseUrl = process.env.NODE_ENV === "production" ? productionUrl : baseUrl

      debugLog("Redirect callback", { url, baseUrl, effectiveBaseUrl })

      // Check if the URL starts with the base URL or is a relative URL
      if (url.startsWith(effectiveBaseUrl) || url.startsWith("/")) {
        return url
      }

      return effectiveBaseUrl
    },
    async session({ session, user, token }) {
      debugLog("Session callback", {
        sessionUser: session.user ? { email: session.user.email } : null,
        tokenSub: token?.sub,
        userId: user?.id,
      })

      // Add user role to session
      if (session.user) {
        if (user) {
          // When using database sessions
          session.user.id = user.id

          try {
            debugLog("Fetching user role from database")
            const { db } = await connectToDatabase()
            const dbUser = await db.collection("users").findOne({ email: user.email })
            session.user.role = dbUser?.role || "viewer"
            debugLog(`User role: ${session.user.role}`)
          } catch (error) {
            debugLog("Error fetching user role:", error)
            session.user.role = "viewer"
          }
        } else if (token) {
          // When using JWT sessions
          session.user.id = token.sub || ""
          session.user.role = (token.role as string) || "viewer"
          debugLog(`Using role from token: ${session.user.role}`)
        }
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      debugLog("JWT callback", {
        tokenSub: token?.sub,
        userId: user?.id,
        accountProvider: account?.provider,
      })

      if (user) {
        token.id = user.id

        try {
          debugLog("Fetching user role for JWT")
          const { db } = await connectToDatabase()
          const dbUser = await db.collection("users").findOne({ email: user.email })
          token.role = dbUser?.role || "viewer"
          debugLog(`JWT user role: ${token.role}`)
        } catch (error) {
          debugLog("Error fetching user role for JWT:", error)
          token.role = "viewer"
        }
      }
      return token
    },
  },
  events: {
    async signIn(message) {
      debugLog("User signed in", {
        user: message.user.email,
        provider: message.account?.provider,
      })
    },
    async signOut(message) {
      debugLog("User signed out", { user: message.token?.email })
    },
    async createUser(message) {
      debugLog("User created", { email: message.user.email })
    },
    async linkAccount(message) {
      debugLog("Account linked", {
        provider: message.account.provider,
        user: message.user.email,
      })
    },
  },
  logger: {
    error(code, metadata) {
      debugLog(`Error: ${code}`, metadata)
    },
    warn(code) {
      debugLog(`Warning: ${code}`)
    },
    debug(code, metadata) {
      debugLog(`Debug: ${code}`, metadata)
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Function to create auth options with dynamic configuration
const createAuthOptions = async (): Promise<NextAuthOptions> => {
  // Ensure MongoDB client is connected
  const client = await clientPromise
  const db = client.db()

  // Verify collections exist
  const collections = await db.listCollections().toArray()
  const collectionNames = collections.map((c) => c.name)

  // Create collections if they don't exist
  if (!collectionNames.includes("users")) {
    await db.createCollection("users")
  }
  if (!collectionNames.includes("accounts")) {
    await db.createCollection("accounts")
  }
  if (!collectionNames.includes("sessions")) {
    await db.createCollection("sessions")
  }
  if (!collectionNames.includes("verification_tokens")) {
    await db.createCollection("verification_tokens")
  }

  // Create MongoDB adapter with proper type assertion
  const adapter = MongoDBAdapter(clientPromise) as any

  // Verify adapter methods
  const requiredMethods = [
    "createUser",
    "getUser",
    "getUserByEmail",
    "getUserByAccount",
    "updateUser",
    "linkAccount",
    "createSession",
    "getSessionAndUser",
    "updateSession",
    "deleteSession",
  ]

  const missingMethods = requiredMethods.filter((method) => !(method in adapter))
  if (missingMethods.length > 0) {
    console.error(`MongoDB adapter missing methods: ${missingMethods.join(", ")}`)
  }

  return {
    ...authOptions,
    adapter,
  }
}

// Helper function to get the server session
export async function getAuthSession() {
  const authOptions = await createAuthOptions()
  return getServerSession(authOptions)
}

// Dynamically add the adapter to authOptions
export async function getAuthOptions(): Promise<NextAuthOptions> {
  try {
    const adapter = await getMongoDBAdapter()
    return {
      ...authOptions,
      adapter,
    }
  } catch (error) {
    debugLog("Failed to get MongoDB adapter, using JWT only", error)
    return authOptions
  }
}
