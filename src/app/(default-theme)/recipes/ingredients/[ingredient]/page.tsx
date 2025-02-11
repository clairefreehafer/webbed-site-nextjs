import { generateIngredients } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ingredients = await generateIngredients();
  return Object.keys(ingredients).map((ingredient) => ({
    ingredient,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ ingredient: string }>;
}) {
  const ingredients = await generateIngredients();
  const ingredient = (await params).ingredient;
  return (
    <section className="content">
      <ul>
        {ingredients[ingredient].map((recipe) => (
          <li key={recipe.title}>
            <a href={`/recipes/${recipe.type}/${recipe}`}>{recipe.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
