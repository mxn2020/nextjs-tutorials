"use client"

import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "Callback":
        return "There was a problem with the authentication callback. This could be due to a misconfiguration in the OAuth provider settings."
      case "OAuthSignin":
        return "Error in the OAuth sign-in process. Please try again later."
      case "OAuthCallback":
        return "Error in the OAuth callback process. Please try again later."
      case "OAuthCreateAccount":
        return "Error creating a new account with the OAuth provider."
      case "EmailCreateAccount":
        return "Error creating a new account with email."
      case "Callback":
        return "Error in the authentication callback process."
      case "OAuthAccountNotLinked":
        return "This email is already associated with another account. Please sign in using the original provider."
      case "EmailSignin":
        return "Error sending the verification email. Please check if the email address is correct."
      case "CredentialsSignin":
        return "The credentials you provided are invalid."
      case "SessionRequired":
        return "You need to be signed in to access this page."
      default:
        return "An unknown error occurred during authentication. Please try again later."
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center text-red-500 mb-2">
              <AlertCircle size={48} />
            </div>
            <CardTitle className="text-2xl text-center">Authentication Error</CardTitle>
            <CardDescription className="text-center">{getErrorMessage(error)}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Try Again</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              If this problem persists, please contact support.
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
