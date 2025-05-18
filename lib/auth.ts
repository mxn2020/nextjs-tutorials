import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Debug logger function
const debugLog = (message: string, data?: any) => {
  console.log(`[NextAuth Debug] ${message}`, data ? JSON.stringify(data, null, 2) : "")
}

export const authOptions: NextAuthOptions = {
  // Start with JWT only for simplicity - no MongoDB adapter yet
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
      // Use Resend directly
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
    async redirect({ url, baseUrl }) {
      debugLog("Redirect callback", { url, baseUrl })
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({ session, token }) {
      debugLog("Session callback", {
        sessionUser: session.user ? { email: session.user.email } : null,
        tokenSub: token?.sub,
      })

      // Add user ID from token to session
      if (session.user && token) {
        session.user.id = token.sub || ""
        session.user.role = (token.role as string) || "viewer"
      }
      return session
    },
    async jwt({ token, user }) {
      debugLog("JWT callback", {
        tokenSub: token?.sub,
        userId: user?.id,
      })

      if (user) {
        token.id = user.id
        token.role = "viewer" // Default role
      }
      return token
    },
  },
  debug: true,
  session: {
    strategy: "jwt", // Use JWT for simplicity
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
