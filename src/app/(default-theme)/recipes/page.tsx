import { getRecipes } from "@/utils";

export default async function Page() {
  const recipes = await getRecipes();
  return (
    <section className="content">
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.title}>
            <a href={`/recipes/${recipe.type}s/${recipe.slug}`}>
              {recipe.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
