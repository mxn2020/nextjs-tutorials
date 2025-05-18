"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Suspense, useEffect } from "react"

function AuthErrorContent() {
  // Get the error from the URL
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    // Log error details to console for debugging
    console.log("[Auth Error Page]", {
      error,
      url: typeof window !== "undefined" ? window.location.href : "",
      searchParams: Object.fromEntries(searchParams.entries()),
    })
  }, [error, searchParams])

  let errorMessage = "An error occurred during authentication."
  let errorDescription = "Please try again or contact support if the problem persists."
  let errorDetails = ""

  // Customize error messages based on NextAuth error codes
  switch (error) {
    case "Configuration":
      errorMessage = "Server configuration error"
      errorDescription = "There is a problem with the server configuration."
      errorDetails = "Check NEXTAUTH_URL and NEXTAUTH_SECRET environment variables."
      break
    case "AccessDenied":
      errorMessage = "Access denied"
      errorDescription = "You do not have permission to sign in."
      break
    case "Verification":
      errorMessage = "Verification error"
      errorDescription = "The verification token has expired or has already been used."
      break
    case "OAuthSignin":
      errorMessage = "OAuth sign-in error"
      errorDescription = "Could not initiate OAuth sign-in."
      errorDetails = "Check provider configuration and client ID/secret."
      break
    case "OAuthCallback":
      errorMessage = "OAuth callback error"
      errorDescription = "Error processing OAuth callback."
      errorDetails = "Verify callback URL configuration in provider settings."
      break
    case "OAuthCreateAccount":
      errorMessage = "Account creation error"
      errorDescription = "Could not create user account with OAuth provider."
      break
    case "EmailCreateAccount":
      errorMessage = "Account creation error"
      errorDescription = "Could not create user account with email."
      break
    case "Callback":
      errorMessage = "Callback error"
      errorDescription = "Error in the authentication callback process."
      errorDetails = "Check that the callback URL is correctly configured in your OAuth provider settings."
      break
    case "OAuthAccountNotLinked":
      errorMessage = "Account not linked"
      errorDescription = "This email is already associated with another account."
      errorDetails = "Sign in with the original provider you used to create your account."
      break
    case "EmailSignin":
      errorMessage = "Email sign-in error"
      errorDescription = "Error sending the verification email."
      errorDetails = "Check email configuration and Resend API key."
      break
    case "CredentialsSignin":
      errorMessage = "Invalid credentials"
      errorDescription = "The credentials you provided are invalid."
      break
    case "SessionRequired":
      errorMessage = "Session required"
      errorDescription = "You need to be signed in to access this page."
      break
    default:
      break
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
        </div>
        <CardTitle className="text-2xl">{errorMessage}</CardTitle>
        <CardDescription>{errorDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          If you continue to experience issues, please contact our support team.
        </p>

        {errorDetails && (
          <div className="bg-muted p-3 rounded-md">
            <p className="text-xs font-mono">{errorDetails}</p>
          </div>
        )}

        <div className="bg-muted p-3 rounded-md">
          <p className="text-xs mb-1 font-medium">Debug Information:</p>
          <p className="text-xs font-mono break-all">Error Code: {error || "None"}</p>
          <p className="text-xs font-mono break-all">
            URL: {typeof window !== "undefined" ? window.location.href : ""}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button asChild className="w-full">
          <Link href="/auth/signin">Try Again</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthErrorContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
