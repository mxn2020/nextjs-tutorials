import NextAuth from "next-auth"
import { getAuthOptions } from "@/lib/auth"

// Export a dynamic handler that gets the auth options at runtime
export async function GET(req: Request, context: { params: { nextauth: string[] } }) {
  const authOptions = await getAuthOptions()
  const handler = NextAuth(authOptions)
  return handler(req, context)
}

export async function POST(req: Request, context: { params: { nextauth: string[] } }) {
  const authOptions = await getAuthOptions()
  const handler = NextAuth(authOptions)
  return handler(req, context)
}
