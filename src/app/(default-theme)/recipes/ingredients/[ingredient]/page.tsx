import { deslugify, generateIngredients, slugify } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ingredients = await generateIngredients();
  return Object.keys(ingredients).map((ingredient) => ({
    ingredient: slugify(ingredient),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ ingredient: string }>;
}) {
  const ingredients = await generateIngredients();
  let ingredient = (await params).ingredient;
  // next.js automatically encodes the ñ in jalapeño in the param.
  // TODO: less hacky impelementation
  if (ingredient.includes("%C3%B1")) {
    ingredient = ingredient.replace("%C3%B1", "ñ");
  }
  return (
    <>
      <h3>recipes with {deslugify(ingredient)}</h3>
      <section className="content">
        <ul>
          {ingredients[deslugify(ingredient)].map((recipe) => (
            <li key={recipe.title}>
              <a href={`/recipes/${recipe.type}s/${recipe.slug}`}>
                {recipe.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
