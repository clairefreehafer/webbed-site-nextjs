import { cache } from "react";
import { prisma } from ".";
import { Recipe, Unit } from "types/recipes";
import { Prisma } from "@prisma/client";

export const findManyRecipes = cache(async (): Promise<Recipe[]> => {
  const recipes = await prisma.recipe.findMany({
    include: { ingredients: true },
  });

  return recipes.map((recipe) => ({
    ...recipe,
    url: recipe.url ?? undefined,
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      unit: ingredient.unit as Unit,
    })),
  }));
});

export const findUniqueRecipe = cache(
  async (where: Prisma.RecipeWhereUniqueInput): Promise<Recipe> => {
    const recipe = await prisma.recipe.findUniqueOrThrow({
      where,
      include: { ingredients: true },
    });

    return {
      ...recipe,
      url: recipe.url ?? undefined,
      ingredients: recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        unit: ingredient.unit as Unit,
      })),
    };
  }
);
