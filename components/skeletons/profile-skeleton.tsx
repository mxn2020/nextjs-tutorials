import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function ProfileHeaderSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 md:h-64 w-full" />

      <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-end relative">
        <Skeleton className="absolute -top-16 left-6 h-24 w-24 rounded-full" />

        <div className="mt-10 md:mt-0 md:ml-24 w-full">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
    </Card>
  )
}

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      <Skeleton className="h-10 w-32" />
    </div>
  )
}
