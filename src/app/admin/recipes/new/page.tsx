import NewRecipeForm from "./form";
import { findManyFood } from "@utils/prisma/food";

export default async function Page() {
  const food = await findManyFood({
    select: {
      name: true,
    },
  });
  const foodOptions = ["", ...food.map((item) => item.name)];

  return <NewRecipeForm foodOptions={foodOptions} />;
}
