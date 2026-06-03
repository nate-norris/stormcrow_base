import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonForm() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-45" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="ml-7 h-8 w-24" />
    </div>
  )
}