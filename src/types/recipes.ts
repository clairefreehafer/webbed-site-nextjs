export const foodCategories = [
  null,
  "carb",
  "fruit",
  "meat",
  "vegetable",
  "seasoning",
] as const;
export type FoodCategory = (typeof foodCategories)[number];

export type Food = {
  id: number;
  name: string;
  category: FoodCategory;
};

export enum Unit {
  Count = "count",
  Tablespoon = "tbsp",
}

export type Ingredient = {
  // id: number;
  quantity: string;
  unit: Unit;
  foodName: string;
};

export type Recipe = {
  // id: number;
  title: string;
  ingredients: Ingredient[];
  instructions: string[];
  url?: string;
};
