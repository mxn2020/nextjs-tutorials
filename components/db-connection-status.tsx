"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, CheckCircle2, Database } from "lucide-react"

interface ConnectionStatus {
  status: "connected" | "disconnected" | "checking"
  responseTime?: string
  collections?: number
  dbName?: string
  error?: string
  timestamp?: string
}

export function DbConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({ status: "checking" })
  const [isLoading, setIsLoading] = useState(true)

  const checkConnection = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/status/db", {
        cache: "no-store",
        next: { revalidate: 0 },
      })

      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        status: "disconnected",
        error: "Failed to check connection status",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <Badge
              variant="outline"
              className={`px-2 py-1 flex items-center gap-1.5 ${
                status.status === "connected"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : status.status === "disconnected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">
                {status.status === "connected"
                  ? "DB Connected"
                  : status.status === "disconnected"
                    ? "DB Disconnected"
                    : "Checking DB..."}
              </span>
              {status.status === "connected" ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              ) : status.status === "disconnected" ? (
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              ) : null}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1.5 text-sm">
            <p className="font-semibold">Database Status</p>
            {status.status === "connected" ? (
              <>
                <p className="text-green-600">✓ Connected to MongoDB</p>
                <p className="text-xs text-muted-foreground">Response time: {status.responseTime}</p>
                <p className="text-xs text-muted-foreground">Database: {status.dbName}</p>
                <p className="text-xs text-muted-foreground">Collections: {status.collections}</p>
                <p className="text-xs text-muted-foreground">
                  Last checked: {new Date(status.timestamp || "").toLocaleTimeString()}
                </p>
              </>
            ) : status.status === "disconnected" ? (
              <>
                <p className="text-red-600">✗ Connection failed</p>
                <p className="text-xs text-muted-foreground">Error: {status.error}</p>
                <p className="text-xs text-muted-foreground">
                  Last checked: {status.timestamp ? new Date(status.timestamp).toLocaleTimeString() : "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Check your MongoDB connection string and network settings.
                </p>
              </>
            ) : (
              <p className="text-yellow-600">Checking connection...</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                checkConnection()
              }}
              className="text-xs text-blue-600 hover:underline mt-1"
            >
              Check again
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
