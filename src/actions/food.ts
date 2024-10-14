"use server";
import { Food, Prisma } from "@prisma/client";
import { FoodCategory } from "types/recipes";
import { prisma } from "@utils/prisma";
import { AdminFormState } from "@components/admin/form";
import { revalidatePath } from "next/cache";

export type FoodFormState = AdminFormState<Food>;

export async function addFood(_prevState: FoodFormState, formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as FoodCategory;

  const data: Prisma.FoodCreateArgs["data"] = {
    name,
    category: category ?? undefined,
  };

  try {
    console.log(`👉 adding food ${name}${category ? `as ${category}` : ""}...`);
    const createdList = await prisma.food.create({ data });

    revalidatePath("/admin/food");

    return {
      ...createdList,
      message: "👍 food added successfully",
    };
  } catch (error) {
    return { ...data, message: `👎 ${(error as Error).message}` };
  }
}
