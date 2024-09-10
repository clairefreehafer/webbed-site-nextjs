import { RecipeVariantRecord, SystemStyleObject } from "@panda/types";

export type Theme =
  | "admin"
  | "animalCrossing"
  | "book"
  | "default"
  | "notebook"
  | "photography"
  | "zelda";

export type ThemeStyles<T = string> = Partial<Record<Theme, T>>;

export interface ThemeVariants extends RecipeVariantRecord {
  theme: Partial<Record<Theme, SystemStyleObject>>;
}
