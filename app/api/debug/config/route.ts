import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { logEnvConfig } from "@/lib/debug"

export async function GET() {
  // Only allow in development or with admin session
  const session = await getServerSession(authOptions)

  if (process.env.NODE_ENV !== "development" && (!session?.user || session.user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    // Log environment configuration to server logs
    logEnvConfig()

    // Return sanitized config info
    return NextResponse.json({
      status: "success",
      message: "Configuration logged to server console",
      auth: {
        providers: {
          github: !!process.env.GITHUB_ID && !!process.env.GITHUB_SECRET,
          google: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET,
          email:
            !!process.env.EMAIL_FROM &&
            ((!!process.env.EMAIL_SERVER_HOST && !!process.env.EMAIL_SERVER_PORT) || !!process.env.RESEND_API_KEY),
        },
        nextAuthUrl: process.env.NEXTAUTH_URL || "Not set",
        nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      },
      database: {
        mongodb: !!process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB || "Not set",
      },
      email: {
        provider: process.env.RESEND_API_KEY ? "Resend" : process.env.EMAIL_SERVER_HOST ? "SMTP" : "Not configured",
        from: process.env.EMAIL_FROM || "Not set",
      },
    })
  } catch (error) {
    console.error("Error in debug config route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
