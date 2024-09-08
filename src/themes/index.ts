export type Theme =
  | "admin"
  | "animalCrossing"
  | "book"
  | "default"
  | "notebook"
  | "photography"
  | "zelda";

export type ThemeStyles<T = string> = Partial<Record<Theme, T>>;
