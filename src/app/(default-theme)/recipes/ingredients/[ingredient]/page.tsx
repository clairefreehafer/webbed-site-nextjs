import { deslugify, generateIngredients, slugify } from "@/utils";
import Link from "next/link";

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

  return (
    <>
      <h3>recipes with {deslugify(ingredient)}</h3>
      <section className="content">
        <ul>
          {ingredients[deslugify(ingredient)].map((recipe) => (
            <li key={recipe.title}>
              <Link href={`/recipes/${recipe.path}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
