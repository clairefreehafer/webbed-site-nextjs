import Tags from "@/components/default/tags";
import { getRecipePages } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getRecipePages();
  return pages.map((page) => ({
    recipe: page.path,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ recipe: string[] }>;
}) {
  const metadata = { title: "claire freehafer" };

  // const recipe = (await params).recipe;
  // const pages = await getRecipes();
  // const currentPage = pages.find((page) => page.slug === recipe[1]);

  // if (currentPage) {
  //   metadata.title = `${currentPage.title} – claire freehafer`;
  // }

  return metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ recipe: string[] }>;
}) {
  const recipePages = await getRecipePages();
  const recipeParam = (await params).recipe;
  const slug = recipeParam[recipeParam.length - 1];
  const currentPage = recipePages.find(
    (page) =>
      page.path.length === recipeParam.length &&
      page.path.every((val, idx) => val === recipeParam[idx])
  );

  if (!currentPage) {
    throw new Error(`couldn't generate page ${recipeParam.join("/")}`);
  }

  if (!currentPage.default) {
    return (
      <>
        <h3>{currentPage.title}</h3>
        <section className="content">
          <ul>
            {recipePages
              .filter(
                (recipe) =>
                  recipe.path.includes(slug) &&
                  recipe.title !== currentPage.title
              )
              .map((recipe) => (
                <li key={recipe.title}>
                  <a href={`/recipes/${recipe.path.join("/")}`}>
                    {recipe.title}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      </>
    );
  }

  const { default: List, title, ingredients, sourceUrl } = currentPage;

  return (
    <>
      <h3>{title}</h3>
      {sourceUrl && (
        <p className="recipe-source">
          [{" "}
          <a href={sourceUrl} target="_blank">
            source
          </a>{" "}
          ]
        </p>
      )}
      <section className="content">
        <List />
      </section>
      <Tags tags={ingredients} linkPrefix="/recipes/ingredients/" />
    </>
  );
}
