import { getCategoryRecipes, getRecipeCategories } from "@/utils";

import Recipe from "./Recipe";

type Params = { recipeCategory: string; recipe: string };

export async function generateStaticParams() {
  const params: Params[] = [];
  const recipeCategories = getRecipeCategories();
  for (const category of recipeCategories) {
    const recipes = await getCategoryRecipes(category, true);
    for (const recipe of recipes.uncategorized) {
      params.push({
        recipeCategory: category,
        recipe: recipe.path,
      });
    }
  }
  return params;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { recipeCategory, recipe } = await params;
  const categoryRecipes = await getCategoryRecipes(recipeCategory, true);
  const recipePage = categoryRecipes.uncategorized.find((r) =>
    r.path.includes(recipe)
  );

  if (!recipePage) {
    return <p>could not find recipe page for &apos;{recipe}&apos;.</p>;
  }
  return <Recipe recipe={recipePage} />;
}
