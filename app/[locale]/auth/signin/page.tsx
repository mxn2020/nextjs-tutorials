"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Suspense } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Debug logger function
const debugLog = (message: string, data?: any) => {
  console.log(`[Auth UI Debug] ${message}`, data ? JSON.stringify(data, null, 2) : "")
}

function SignInForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  // Get the callbackUrl and error from the URL
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  useEffect(() => {
    debugLog("SignInForm mounted", { callbackUrl, error })

    if (error) {
      const errorMessages: Record<string, string> = {
        Callback: "There was a problem with the authentication callback.",
        OAuthSignin: "Error in the OAuth sign-in process.",
        OAuthCallback: "Error in the OAuth callback process.",
        OAuthCreateAccount: "Error creating a new account with the OAuth provider.",
        EmailCreateAccount: "Error creating a new account with email.",
        OAuthAccountNotLinked: "This email is already associated with another account.",
        EmailSignin: "Error sending the verification email.",
        CredentialsSignin: "The credentials you provided are invalid.",
        SessionRequired: "You need to be signed in to access this page.",
        default: "An unknown error occurred during authentication.",
      }

      const errorMsg = errorMessages[error] || errorMessages.default
      setErrorMessage(errorMsg)
      setDebugInfo(`Error type: ${error}, URL: ${window.location.href}`)
      debugLog("Authentication error", { error, errorMsg })
    }
  }, [error, callbackUrl])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    setDebugInfo(null)

    debugLog("Attempting email sign in", { email, callbackUrl })

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl,
      })

      debugLog("Email sign in result", result)

      if (result?.error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
        setErrorMessage("Failed to send verification email. Please try again.")
        setDebugInfo(`Error: ${result.error}, Status: ${result.status}`)
      } else {
        router.push("/auth/verify-request")
      }
    } catch (error) {
      debugLog("Exception during email sign in", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setErrorMessage("An unexpected error occurred. Please try again.")
      setDebugInfo(`Exception: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSignIn = (provider: string) => {
    setIsLoading(true)
    setErrorMessage(null)
    setDebugInfo(null)

    debugLog(`Initiating ${provider} sign in`, { callbackUrl })

    // Add a small delay to ensure the debug log is visible in the console
    setTimeout(() => {
      signIn(provider, { callbackUrl })
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your account and personalized content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              {debugInfo && (
                <div className="mt-2 p-2 bg-gray-100 text-xs font-mono overflow-auto max-h-24">{debugInfo}</div>
              )}
            </Alert>
          )}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleProviderSignIn("github")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleProviderSignIn("google")}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M12 22q-2.05 0-3.875-.788t-3.188-2.15-2.137-3.175T2 12q0-2.075.788-3.887t2.15-3.175 3.175-2.138T12 2q2.075 0 3.887.788t3.175 2.15 2.138 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188-3.175 2.137T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending link..." : "Sign in with Email"}
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm />
        </Suspense>
      </main>
    </div>
  )
}
