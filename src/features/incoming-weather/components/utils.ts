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

export function getReceivingStatusColor(status: WeatherS): string {
  if (status == WeatherStatus.NotReceiving)
    return "bg-red-700";
  if (status == WeatherStatus.Stale)
    return "bg-yellow-600";
  if (status == WeatherStatus.Receiving) 
    return "bg-green-600";
  
  return "bg-gray-500";
}

export function getWindStateColor(state: WindState): string {
  if (state == WindState.Critical)
    return "bg-red-700";
  if (state == WindState.Warn)
    return "bg-yellow-600";
  if (state == WindState.Ok) 
    return "bg-green-600";
  
  return "bg-gray-500";
}

export function formatReceivingStatusText(status: WeatherS): string {
  switch (status) {
    case WeatherStatus.Receiving:
      return "Receiving";
    case WeatherStatus.Stale:
      return "Stale";
    case WeatherStatus.NotReceiving:
      return "Not Receiving";
    default:
      return "Unknown";
  }
}