import type { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend"
import { connectToDatabase } from "@/lib/mongodb"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter({
    db: (async () => {
      const { db } = await connectToDatabase()
      return db
    })(),
  }),
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
      server: {
        host: process.env.EMAIL_SERVER_HOST || "",
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "noreply@tutorials.coder-verse.io",
      // Custom sendVerificationRequest function using Resend
      async sendVerificationRequest({ identifier, url, provider }) {
        try {
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
            console.error("Error sending verification email:", error)
            throw new Error(`Error sending verification email: ${error.message}`)
          }
        } catch (error) {
          console.error("Error sending verification email:", error)
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
    async session({ session, user, token }) {
      // Add user role to session
      if (session.user) {
        if (user) {
          // When using database sessions
          session.user.id = user.id

          try {
            const { db } = await connectToDatabase()
            const dbUser = await db.collection("users").findOne({ email: user.email })
            session.user.role = dbUser?.role || "viewer"
          } catch (error) {
            console.error("Error fetching user role:", error)
            session.user.role = "viewer"
          }
        } else if (token) {
          // When using JWT sessions
          session.user.id = token.sub
          session.user.role = token.role || "viewer"
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id

        try {
          const { db } = await connectToDatabase()
          const dbUser = await db.collection("users").findOne({ email: user.email })
          token.role = dbUser?.role || "viewer"
        } catch (error) {
          console.error("Error fetching user role for JWT:", error)
          token.role = "viewer"
        }
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
