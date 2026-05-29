export interface Test {
  id: number;
  name: string;
  time: number;
}

// modes for test management selections
export const Step = {
  Menu: "menu",
  New: "new",
  Continue: "continue",
  Delete: "delete",
} as const;
export type StepMode = typeof Step[keyof typeof Step];