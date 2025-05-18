import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Export handlers for GET and POST requests
export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)

// Add dynamic config to ensure proper handling
export const dynamic = "force-dynamic"
