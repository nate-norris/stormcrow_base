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
    return "bg-wind-danger";
  if (status == WeatherStatus.Stale)
    return "bg-wind-warning";
  if (status == WeatherStatus.Receiving) 
    return "bg-wind-safe";
  
  return "bg-wind-warning";
}

export function getWindStateColor(state: WindState | null): string {
  if (!state) return "bg-wind-warning";

  if (state == WindState.Critical)
    return "bg-wind-danger";
  if (state == WindState.Warn)
    return "bg-wind-warning";
  if (state == WindState.Ok) 
    return "bg-wind-safe";
  
  return "bg-wind-warning";
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