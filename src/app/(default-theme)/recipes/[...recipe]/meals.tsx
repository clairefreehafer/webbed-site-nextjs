import { deslugify, getRecipePages } from "@/utils";
import { RecipePage } from "@/utils/types";
import Link from "next/link";

// https://dev.to/madsstoumann/showing-time-ago-in-a-social-feed-using-intlrelativetimeformat-5ceo
function timeAgo(date: Date) {
  let value;
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (years > 0) {
    value = rtf.format(0 - years, "year");
  } else if (months > 0) {
    value = rtf.format(0 - months, "month");
  } else {
    value = rtf.format(0 - days, "day");
  }
  // else if (hours > 0) {
  //   value = rtf.format(0 - hours, "hour");
  // } else if (minutes > 0) {
  //   value = rtf.format(0 - minutes, "minute");
  // } else {
  //   value = rtf.format(0 - diff, "second");
  // }
  return value;
}

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

                  {page.lastMade && (
                    <div className="last-made" title="last made">
                      {timeAgo(page.lastMade)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
