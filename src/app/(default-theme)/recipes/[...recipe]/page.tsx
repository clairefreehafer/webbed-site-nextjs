import Tags from "@/components/default/tags";
import { areArraysEqual, getRecipePages } from "@/utils";
import Meals from "./meals";

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

  const recipe = (await params).recipe;
  const pages = await getRecipePages();
  const currentPage = pages.find((page) => areArraysEqual(page.path, recipe));

  if (currentPage) {
    metadata.title = `${currentPage.title} – claire freehafer`;
  }

  return metadata;
}

const SECTION_PAGES: Record<string, any> = {
  meals: Meals,
};

export default async function Page({
  params,
}: {
  params: Promise<{ recipe: string[] }>;
}) {
  const recipePages = await getRecipePages();
  const recipeParam = (await params).recipe;
  const slug = recipeParam[recipeParam.length - 1];
  const currentPage = recipePages.find((page) =>
    areArraysEqual(page.path, recipeParam)
  );

  if (!currentPage) {
    throw new Error(`couldn't generate page ${recipeParam.join("/")}`);
  }

  const { default: Page, title } = currentPage;

  if (!Page) {
    const SectionPage = SECTION_PAGES[title];
    if (SectionPage) {
      return <SectionPage />;
    }
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

  const { ingredients, sourceUrl } = currentPage;

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
        <Page />
      </section>
      <Tags tags={ingredients} linkPrefix="/recipes/ingredients/" />
    </>
  );
}
