import { WeatherSites } from "@/features/incoming-weather";

export function FiringView() {
  return (
    <div className="flex h-full min-h-0">
        <WeatherSites />
    </div>
  );
}