// TODO auto load last session if need be
// features/test-session/sessionFlow.ts
import type { Test } from "@/models";

export function getMostRecentTest(tests: Test[]): Test | null {
  if (!tests.length) return null;

  return [...tests].sort((a, b) => b.time - a.time)[0];
}

export function isWithin24Hours(timestamp: number): boolean {
  const diff = Date.now() - timestamp * 1000;
  return diff < 24 * 60 * 60 * 1000;
}

export function shouldAutoResume(test: Test | null): boolean {
  if (!test) return false;
  return isWithin24Hours(test.time);
}