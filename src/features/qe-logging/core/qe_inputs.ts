import type { Test } from "@/features/test-session";
import { QEFormState } from "../core/qe-form";
import type { WindWarningConfig } from "@/features/wind-warnings";
import type { WeatherObservers } from "@/features/incoming-weather";

export type QEInputs = {
  test: Test | null;
  qeForm: QEFormState;
  warnConfig: WindWarningConfig;
  observers: WeatherObservers;
};