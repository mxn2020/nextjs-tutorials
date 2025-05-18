import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    nextauth_url: process.env.NEXTAUTH_URL ? "Set" : "Not set",
    github_id: process.env.GITHUB_ID ? "Set" : "Not set",
    google_client_id: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
    resend_api_key: process.env.RESEND_API_KEY ? "Set" : "Not set",
    mongodb_uri: process.env.MONGODB_URI ? "Set" : "Not set",
    nextauth_secret: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
  })
}
