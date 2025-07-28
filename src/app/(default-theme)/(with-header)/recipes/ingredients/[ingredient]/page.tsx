import { deslugify, generateIngredients, slugify } from "@/utils";
import Link from "next/link";

type Params = Promise<{ ingredient: string }>;

export async function generateStaticParams() {
  const ingredients = await generateIngredients();
  return Object.keys(ingredients).map((ingredient) => ({
    ingredient: slugify(ingredient),
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const ingredient = (await params).ingredient;
  return {
    title: `recipes with ${deslugify(ingredient)} — claire freehafer`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const ingredients = await generateIngredients();
  const ingredient = (await params).ingredient;

  return (
    <>
      <h3>recipes with {deslugify(ingredient)}</h3>
      <section className="content">
        <ul>
          {ingredients[deslugify(ingredient)].map((recipe) => (
            <li key={recipe.title}>
              <Link href={`/recipes/${recipe.path.join("/")}`}>
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
