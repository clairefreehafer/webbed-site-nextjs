import { getRecipePages } from "@/utils";
import { RecipePage } from "@/utils/types";
import { Fragment } from "react";

export default async function Meals() {
  const recipes = await getRecipePages();
  const mealPages: Record<string, RecipePage[]> = {};
  const uncategorizedPages = [];

  for (const recipe of recipes) {
    if (recipe.path.includes("meals")) {
      const category = recipe.path[recipe.path.length - 2];
      if (recipe.isCategory) {
        // meals section, do not include
      } else if (category === "meals") {
        // uncategorized
        uncategorizedPages.push(recipe);
      } else if (mealPages[category]) {
        mealPages[category].push(recipe);
      } else {
        mealPages[category] = [recipe];
      }
    }
  }

  // add uncategorized recipes last
  mealPages.uncategorized = uncategorizedPages;

  return (
    <>
      <h3>meal recipes</h3>
      <section className="content">
        {Object.keys(mealPages).map((category) => (
          <Fragment key={category}>
            <h4>{category}</h4>
            <ul>
              {mealPages[category].map((page: RecipePage) => (
                <li key={page.title}>
                  <a href={`/recipes/${page.path.join("/")}`}>{page.title}</a>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </section>
    </>
  );
}
