import { cache } from "react";
import { prisma } from ".";
import { Food, FoodCategory } from "types/recipes";
import { Prisma } from "@prisma/client";

export const findManyFood = cache(
  async (args?: Prisma.FoodFindManyArgs): Promise<Food[]> => {
    const food = await prisma.food.findMany(args);

    return food.map(({ category, ...rest }) => ({
      ...rest,
      category: category as FoodCategory,
    }));
  }
);
