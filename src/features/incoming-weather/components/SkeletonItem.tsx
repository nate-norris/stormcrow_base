import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonWeather() {
  return (
    <div className="flex items-center gap-4 ml-10">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
