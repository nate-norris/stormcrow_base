export function formatUnixToTime(ms: number) {
  const date = new Date(ms);

  const pad = (n: number) => String(n).padStart(2, "0");

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}