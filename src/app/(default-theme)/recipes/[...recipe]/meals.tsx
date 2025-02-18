import LastMade from "@/components/default/last-made";
import { deslugify, getRecipePages } from "@/utils";
import { RecipePage } from "@/utils/types";
import Link from "next/link";

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
          <div key={category}>
            <h4>{deslugify(category)}</h4>
            <ul>
              {mealPages[category].map((page: RecipePage) => (
                <li key={page.title}>
                  <Link href={`/recipes/${page.path.join("/")}`}>
                    {page.title}
                  </Link>

                  <LastMade lastMade={page.lastMade} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
