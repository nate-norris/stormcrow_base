// modes for test management selections
const modes = [
  "menu",
  "new",
  "continue",
  "delete",
  "confirmDelete",
] as const;
export type StepMode = typeof modes[number];
