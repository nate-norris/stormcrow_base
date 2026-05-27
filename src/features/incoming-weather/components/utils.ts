import { WeatherStatus, WindState } from "../core/models";
import type { WeatherS } from "../core/models";

export function formatUnixToTime(ms: number) {
  const date = new Date(ms);

  const pad = (n: number) => String(n).padStart(2, "0");

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

export function getStatusColor(status: WeatherS, state: WindState): string {
  if (status == WeatherStatus.NotReceiving || state == WindState.Critical)
    return "bg-red-500";
  if (status == WeatherStatus.Stale || state == WindState.Warn)
    return "bg-yellow-500";
  if (status == WeatherStatus.Receiving || state == WindState.Ok) 
    return "bg-green-500";
  
  return "bg-gray-500";
}