import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Export the NextAuth handler
export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)
