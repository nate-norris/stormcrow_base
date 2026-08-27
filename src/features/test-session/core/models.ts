import type { WindWarningConfig } from "@/features/wind-warnings";
import type { WeatherRow } from "@/features/qe-table";

export interface Test {
  id: number;
  name: string;
  time: number;
}

export interface LastTest {
  test: Test;
  last_initiated: number;
}

export interface TestSession {
  test: Test;
  config: WindWarningConfig;
  qes: WeatherRow[];
}

// modes for test management selections
export const Step = {
  Menu: "menu",
  New: "new",
  Continue: "continue",
  Delete: "delete",
} as const;
export type StepMode = typeof Step[keyof typeof Step];

export const CONTINUE_TIMEFRAME = 1000 * 60 * 60 * 24;