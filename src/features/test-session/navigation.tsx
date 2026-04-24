import type { StepMode } from "./models";
import { Step } from "./models";

// options for allowed steps to return to test management menu
const canGoBackToMenu: StepMode[] = [Step.New, Step.Continue, Step.Delete];

export function createNavigation(
  step: StepMode,
  setStep: (s: StepMode) => void,
  onComplete: () => void
) {
  return {
    go: (next: StepMode) => setStep(next),

    back: () => {
      if (canGoBackToMenu.includes(step)) {
        setStep("menu");
      }
    },

    complete: () => {
      onComplete();
    },
  };
}