type Food = {
  id: number;
  name: string;
  category: "carb" | "fruit" | "meat" | "vegetable";
};

type Ingredient = {
  quantity: number;
  unit: string; // TODO: enum
  item: Food;
};

type Recipe = {
  id: number;
  title: string;
  ingredients: Ingredient[];
  instructions: string[];
  url?: string;
};
