import { generateIngredients } from "@/utils";

export default async function Page() {
  const ingredients = await generateIngredients();
  return (
    <>
      <h3>recipe ingredients</h3>
      <section className="content">
        <ul>
          {Object.keys(ingredients)
            .sort()
            .map((ingredient) => (
              <li key={ingredient}>
                <a href={`/recipes/ingredients/${ingredient}`}>{ingredient}</a>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
