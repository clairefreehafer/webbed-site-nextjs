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
    return `Could not find ${recipeType} recipe ${slug}`;
  }
  const { default: List, title } = currentRecipe;

  return (
    <>
      <h3>{title}</h3>
      <section className="content">
        <List />
      </section>
      {/* <Tags tags={tags} linkPrefix="/lists/tags/" /> */}
    </>
  );
}
