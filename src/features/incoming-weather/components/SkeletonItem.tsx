import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonWeather() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[120px]" />
        <Skeleton className="h-3 w-[160px]" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
    </div>
  )
}
