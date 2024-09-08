export type Theme =
  | "admin"
  | "animalCrossing"
  | "book"
  | "default"
  // TODO: rename to "journal"?
  | "notebook"
  | "photography"
  | "zelda";

export type ThemeStyles<T = string> = Partial<Record<Theme, T>>;
