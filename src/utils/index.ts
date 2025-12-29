import fs from "fs";
import os from "os";
import path from "path";
import { cache } from "react";

import { RecipePage } from "@/types/markdown";

export const getRecipeCategories = cache((): string[] => {
  return fs.readdirSync(path.join(process.cwd(), "src", "recipes"));
});

type CategoryRecipes = {
  uncategorized: RecipePage[];
  [subcategory: string]: RecipePage[];
};

export const getCategoryRecipes = cache(
  async (
    category: string,
    uncategorized?: boolean
  ): Promise<CategoryRecipes> => {
    const categoryRecipes: Omit<CategoryRecipes, "uncategorized"> = {};
    const uncategorizedRecipes: RecipePage[] = [];

    const files = fs.readdirSync(
      path.join(process.cwd(), "src", "recipes", category),
      {
        recursive: true,
        withFileTypes: true,
      }
    );

    for (const file of files) {
      // ignore any files that start with an underscore - they are drafts.
      if (file.name.startsWith("_")) {
        continue;
      }
      // if file is a directory, it is a subdirectory and should be set as a
      // key on the result object (but only if we are not requesting a flat array).
      const isSubcategory = file.isDirectory();
      if (isSubcategory && !uncategorized) {
        categoryRecipes[file.name] = [];
      } else if (!isSubcategory) {
        // check if the parent directory for a recipe is the root category or a subcategory.
        const recipeParentSplit = file.parentPath.split("/");
        const recipeParent = recipeParentSplit[recipeParentSplit.length - 1];
        const hasSubcategory = recipeParent !== category;

        const page = await import(
          `@/recipes/${
            hasSubcategory ? `${category}/${recipeParent}` : `${category}`
          }/${file.name}`
        );

        if (!page) {
          throw new Error(
            `[getCategoryRecipes] could not import recipe file ${file.name}`
          );
        }

        const recipe: RecipePage = {
          path: file.name.split(".")[0],
          category,
          ...page,
        };
        if (uncategorized || recipeParent === category) {
          // if the recipe does not have a subcategory, OR we want a flat array
          // of all recipes, push it into our uncategorized array.
          uncategorizedRecipes.push(recipe);
        } else {
          categoryRecipes[recipeParent].push(recipe);
        }
      }
    }

    return { ...categoryRecipes, uncategorized: uncategorizedRecipes };
  }
);

export async function generateIngredients() {
  const ingredients: Record<string, RecipePage[]> = {};
  const categories = getRecipeCategories();

  for (const category of categories) {
    const categoryRecipes = await getCategoryRecipes(category, true);

    for (const recipe of categoryRecipes.uncategorized) {
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          if (ingredients[ingredient]) {
            ingredients[ingredient].push(recipe);
          } else {
            ingredients[ingredient] = [recipe];
          }
        }
      }
    }
  }

  return ingredients;
}

export function slugify(string: string): string {
  return string.replaceAll(" & ", "-and-").replaceAll(" ", "-");
}

export function deslugify(string: string): string {
  return string.replaceAll("-and-", " & ").replaceAll("-", " ");
}

export const noRobots = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export function setEnvValue(key: string, value: string) {
  // read file & split if from a linebreak to a array
  const envVars = fs
    .readFileSync(path.join(process.cwd(), ".env"), "utf8")
    .split(os.EOL);

  const existingVar = envVars.find((line) => {
    return line.match(new RegExp(key));
  });

  if (!existingVar) {
    throw new Error(`could not find exisiting env var to overwrite: ${key}`);
  }

  // find the env we want based on the key
  const target = envVars.indexOf(existingVar);

  // replace the key/value with the new value
  envVars.splice(target, 1, `${key}=${value}`);

  // write everything back to the file system
  fs.writeFileSync("./.env", envVars.join(os.EOL));
}
