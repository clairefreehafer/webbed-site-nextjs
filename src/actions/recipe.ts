"use server";

import { NewRecipeFormState } from "@app/admin/recipes/new/form";
import { Ingredient, Prisma, Recipe } from "@prisma/client";
import { prisma } from "@utils/prisma";

export async function addRecipe(
  _initialState: NewRecipeFormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const ingredients = JSON.parse(
    formData.get("ingredients") as string
  ) as Ingredient[];
  const instructions = JSON.parse(
    formData.get("instructions") as string
  ) as Recipe["instructions"];

  const data: Prisma.RecipeCreateArgs["data"] = {
    title,
    url,
    instructions,
  };

  try {
    const create: Prisma.IngredientUncheckedCreateWithoutRecipesInput[] = [];
    const connect: Prisma.IngredientWhereUniqueInput[] = [];

    for (let ingredient of ingredients) {
      const { foodName, quantity, unit } = ingredient;
      const ingredientRecord = await prisma.ingredient.findFirst({
        where: { foodName, quantity, unit },
      });

      if (ingredientRecord) {
        connect.push({ id: ingredientRecord.id });
      } else {
        create.push(ingredient);
      }
    }

    data.ingredients = { connect, create };

    const addedRecipe = await prisma.recipe.create({ data });

    return {
      ...addedRecipe,
      message: "👍 recipe created successfully.",
    };
  } catch (error) {
    return { ...data, message: `👎 ${(error as Error).message}` };
  }
}
