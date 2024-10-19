import { prisma } from "@utils/prisma";

export async function generateStaticParams() {
  const recipes = await prisma.recipe.findMany({
    select: { title: true },
  });

  return recipes.map((recipe) => ({
    recipeTitle: recipe.title,
  }));
}

export default async function Page({
  params,
}: {
  params: { recipeTitle: string };
}) {
  const recipe = await prisma.recipe.findUniqueOrThrow({
    where: { title: params.recipeTitle },
    include: { ingredients: true },
  });
  return (
    <div>
      <h3>{recipe.title}</h3>

      <h4>ingredients</h4>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.quantity} {ingredient.unit} {ingredient.foodName}
          </li>
        ))}
      </ul>

      <h4>instructions</h4>
      <ol>
        {recipe.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
