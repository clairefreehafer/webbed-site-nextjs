import Link from "next/link";

import {
  deslugify,
  getCategoryRecipes,
  getRecipeCategories,
  noRobots,
} from "@/utils";

import ListWithSubcategories from "./ListWithSubcategories";

type Params = { recipeCategory: string };

export function generateStaticParams(): Params[] {
  const categories = getRecipeCategories();
  return categories.map((category) => ({
    recipeCategory: category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const recipeCategory = (await params).recipeCategory;
  return {
    title: deslugify(recipeCategory),
    robots: noRobots,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const recipeCategory = (await params).recipeCategory;
  const recipes = await getCategoryRecipes(recipeCategory);
  const hasSubcategories = Object.keys(recipes).length > 1;

  return (
    <>
      <h3>{deslugify(recipeCategory)}</h3>
      <section className="content">
        {hasSubcategories ? (
          <ListWithSubcategories category={recipeCategory} recipes={recipes} />
        ) : (
          <ul>
            {recipes.uncategorized.map((recipe) => (
              <li key={recipe.path}>
                <Link href={`/recipes/${recipeCategory}/${recipe.path}`}>
                  {recipe.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
