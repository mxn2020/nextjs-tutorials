"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export default function DebugPage() {
  const { data: session, status } = useSession()
  const [configData, setConfigData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/debug/config")
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch configuration")
      }

      setConfigData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchConfig()
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container max-w-4xl mx-auto p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center items-center h-40">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container max-w-4xl mx-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>Debug Page</CardTitle>
              <CardDescription>Authentication required</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription>You must be signed in to access this page.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container max-w-4xl mx-auto p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Debug Information</CardTitle>
                <CardDescription>System configuration and authentication details</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={fetchConfig} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="session">
              <TabsList className="mb-4">
                <TabsTrigger value="session">Session</TabsTrigger>
                <TabsTrigger value="config">Configuration</TabsTrigger>
                <TabsTrigger value="auth">Authentication</TabsTrigger>
              </TabsList>

              <TabsContent value="session" className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">Current Session</h3>
                  <pre className="text-xs overflow-auto max-h-96 p-2 bg-background rounded">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Session Status</AlertTitle>
                  <AlertDescription>
                    You are currently signed in as {session?.user?.email || "Unknown User"}
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="config">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">System Configuration</h3>
                  {configData ? (
                    <pre className="text-xs overflow-auto max-h-96 p-2 bg-background rounded">
                      {JSON.stringify(configData, null, 2)}
                    </pre>
                  ) : (
                    <div className="flex justify-center items-center h-20">
                      {loading ? (
                        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                      ) : (
                        <p className="text-sm text-muted-foreground">No configuration data available</p>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="auth">
                <div className="space-y-4">
                  <Alert variant={configData?.auth?.nextAuthSecret ? "default" : "destructive"}>
                    <AlertTitle>NextAuth Secret</AlertTitle>
                    <AlertDescription>
                      {configData?.auth?.nextAuthSecret
                        ? "NEXTAUTH_SECRET is properly configured"
                        : "NEXTAUTH_SECRET is missing or not configured"}
                    </AlertDescription>
                  </Alert>

                  <Alert variant={configData?.auth?.nextAuthUrl ? "default" : "destructive"}>
                    <AlertTitle>NextAuth URL</AlertTitle>
                    <AlertDescription>
                      {configData?.auth?.nextAuthUrl !== "Not set"
                        ? `NEXTAUTH_URL is set to: ${configData?.auth?.nextAuthUrl}`
                        : "NEXTAUTH_URL is not configured"}
                    </AlertDescription>
                  </Alert>

                  <h3 className="text-sm font-medium mt-4 mb-2">Authentication Providers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">GitHub</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {configData?.auth?.providers?.github ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm">Configured</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm">Not configured</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">Google</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {configData?.auth?.providers?.google ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm">Configured</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm">Not configured</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">Email</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {configData?.auth?.providers?.email ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm">Configured</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm">Not configured</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            This information is only visible to authenticated users.
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
