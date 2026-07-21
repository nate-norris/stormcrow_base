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
    return "bg-status-danger";
  if (status == WeatherStatus.Stale)
    return "bg-status-warning";
  if (status == WeatherStatus.Receiving) 
    return "bg-status-safe";
  
  return "bg-status-warning";
}

export function getWindStateColor(state: WindState | null): string {
  if (!state) return "bg-status-warning";

  if (state == WindState.Critical)
    return "bg-status-danger";
  if (state == WindState.Warn)
    return "bg-status-warning";
  if (state == WindState.Ok) 
    return "bg-status-safe";
  
  return "bg-status-warning";
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