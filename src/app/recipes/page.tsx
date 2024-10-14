import { prisma } from "@utils/prisma";

export default async function Page() {
  const recipes = await prisma.recipe.findMany();

  if (recipes.length === 0) return <>no recipes (yet)</>;

  return <>future recipes section placeholder.</>;
}
