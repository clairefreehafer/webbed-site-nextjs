import fs from "fs";
import path from "path";
import { cache } from "react";

import { RecipePage } from "./types";

export function areArraysEqual(arr1: string[], arr2: string[]) {
  return (
    arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx])
  );
}

export const getRecipePages = cache(async (): Promise<RecipePage[]> => {
  const pages: RecipePage[] = [];
  const files = fs.readdirSync(path.join(process.cwd(), "src", "recipes"), {
    recursive: true,
    withFileTypes: true,
  });

  for (const file of files) {
    if (file.name.startsWith("_")) {
      continue;
    }
    const isRecipe = !file.isDirectory();
    const fileNameSplit = file.parentPath.split("/");
    const path = [];

    let currentIndex = fileNameSplit.length - 1;
    let currentDirectory = fileNameSplit[currentIndex];
    // generate path heirarchy
    // TODO use .split or whatever instead
    while (currentDirectory !== "recipes" && currentIndex > -1) {
      path.unshift(currentDirectory);
      currentIndex--;
      currentDirectory = fileNameSplit[currentIndex];
    }

    if (isRecipe) {
      // add page slug for full `params` array
      path.push(file.name.split(".")[0]);
      const page = await import(`@/recipes/${path.join("/")}.mdx`);
      pages.push({
        ...page,
        path,
      });
    } else {
      const directoryName = file.name;
      path.push(directoryName);
      pages.push({
        title: directoryName,
        default: null,
        path,
        ingredients: [],
        isCategory: true,
      });
    }
  }

  return pages;
});

export async function generateIngredients() {
  const ingredients: Record<string, RecipePage[]> = {};
  const recipes = await getRecipePages();

  for (const recipe of recipes) {
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
