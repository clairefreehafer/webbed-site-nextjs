import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import recipeIngredients from "@/data/recipe-ingredients.json";
import { generateIngredients, noRobots, slugify } from "@/utils";

export const metadata: Metadata = {
  title: "recipe ingredients",
  robots: noRobots,
};

export default async function Page() {
  const stringifiedIngredients = JSON.stringify(recipeIngredients);
  const ingredients = await generateIngredients();
  const uncategorizedIngredients: string[] = [];

  for (const ingredient of Object.keys(ingredients)) {
    if (!stringifiedIngredients.includes(ingredient)) {
      uncategorizedIngredients.push(ingredient);
    }
  }

  function renderIngredients() {
    return recipeIngredients.map((recipeIngredient) => (
      <Fragment key={recipeIngredient.name}>
        <h4>{recipeIngredient.name}</h4>
        {recipeIngredient.items.map((item) => (
          <Fragment key={item.name}>
            <h5>{item.name}</h5>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0 1.5rem",
                // listStyle: "none",
                // padding: 0,
              }}
            >
              {item.items.map((ingredient) => (
                <li key={ingredient}>
                  <Link href={`/recipes/ingredients/${slugify(ingredient)}`}>
                    {ingredient}
                  </Link>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </Fragment>
    ));
  }

  return (
    <>
      <h3>recipe ingredients</h3>
      <section className="content">
        {renderIngredients()}
        {uncategorizedIngredients.length > 0 && (
          <>
            <h4>uncategorized</h4>
            <p>
              (ones i haven&apos;t gotten around to assigning categories yet)
            </p>
            <ul>
              {uncategorizedIngredients.map((ingredient) => (
                <li key={ingredient}>
                  <Link href={`/recipes/ingredients/${slugify(ingredient)}`}>
                    {ingredient}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
