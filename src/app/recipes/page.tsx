import StyledLink from "@components/Link";
import { slugName } from "@utils/album";
import { prisma } from "@utils/prisma";

export default async function Page() {
  const recipes = await prisma.recipe.findMany();

  if (recipes.length === 0) return <>no recipes (yet)</>;

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <StyledLink href={`/recipes/${slugName(recipe.title)}`}>
            {recipe.title}
          </StyledLink>
        </li>
      ))}
    </ul>
  );
}
