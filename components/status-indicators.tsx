import { DbConnectionStatus } from "@/components/db-connection-status"

export function StatusIndicators() {
  return (
    <div className="flex items-center gap-3">
      <DbConnectionStatus />
    </div>
  )
}
