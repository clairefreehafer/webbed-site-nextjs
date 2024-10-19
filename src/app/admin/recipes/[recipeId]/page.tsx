import UpdateRecipeForm from "./form";
import { findUniqueRecipe } from "@utils/prisma/recipe";

export default async function Page({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const recipe = await findUniqueRecipe({ id: parseInt(recipeId) });

  return <UpdateRecipeForm recipe={recipe} />;
}
