export type Theme =
  | "default"
  | "notebook"
  | "photography"
  | "animalCrossing"
  | "zelda"
  | "admin";

export type ThemeStyles<T = string> = Partial<Record<Theme, T>>;
