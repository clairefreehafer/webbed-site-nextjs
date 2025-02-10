import Tags from "@/components/tags";
import { getRecipes } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getRecipes();
  return pages.map((page) => ({
    recipe: [`${page.type}s`, page.slug],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ recipe: string[] }>;
}) {
  const metadata = { title: "claire freehafer" };

  const recipe = (await params).recipe;
  const pages = await getRecipes();
  const currentPage = pages.find((page) => page.slug === recipe[1]);

  if (currentPage) {
    metadata.title = `${currentPage.title} – claire freehafer`;
  }

  return metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ recipe: string }>;
}) {
  const [recipeType, slug] = (await params).recipe;
  const recipes = await getRecipes();
  const currentRecipe = recipes.find((recipe) => slug === recipe.slug);

  if (!currentRecipe) {
    return (
      <>
        <h3>{recipeType}</h3>
        <section className="content">
          <ul>
            {recipes
              .filter((recipe) => recipeType.includes(recipe.type))
              .map((recipe) => (
                <li key={recipe.title}>
                  <a href={`/recipes/${recipeType}/${recipe.slug}`}>
                    {recipe.title}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      </>
    );
  }

  const { default: List, title, ingredients } = currentRecipe;

  return (
    <>
      <h3>{title}</h3>
      <section className="content">
        <List />
      </section>
      <Tags tags={ingredients} linkPrefix="/recipes/ingredients/" />
    </>
  );
}
