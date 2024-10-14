import { Prisma } from "@prisma/client";
import { Ingredient, Unit } from "types/recipes";
import { cache } from "react";
import { prisma } from ".";

export const findManyIngredients = cache(
  async (args?: Prisma.IngredientFindManyArgs): Promise<Ingredient[]> => {
    const ingredients = await prisma.ingredient.findMany({
      ...(args ?? {}),
      include: {
        food: {
          select: {
            name: true,
          },
        },
      },
    });

    return ingredients.map(({ unit, food, ...rest }) => ({
      ...rest,
      unit: unit as Unit,
      foodName: food.name,
    }));
  }
);
