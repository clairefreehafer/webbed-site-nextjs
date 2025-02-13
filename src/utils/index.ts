import fs from "fs";
import path from "path";
import { ListPage, RecipePage } from "./types";

export function areArraysEqual(arr1: string[], arr2: string[]) {
  return (
    arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx])
  );
}

export async function getLists(): Promise<ListPage[]> {
  const listData: ListPage[] = [];
  const lists = fs
    .readdirSync(path.join(process.cwd(), "src", "lists"))
    .filter((list) => !list.startsWith("_"));

  for (const list of lists) {
    const listPage = await import(`@/lists/${list}`);
    listData.push({ ...listPage, slug: list.split(".")[0] });
  }
  return listData;
}

export async function generateTags() {
  const tags: Record<string, ListPage[]> = {};
  const lists = await getLists();

  for (const list of lists) {
    if (list.tags) {
      for (const tag of list.tags) {
        if (tags[tag]) {
          tags[tag].push(list);
        } else {
          tags[tag] = [list];
        }
      }
    }
  }

  return tags;
}

export async function getRecipePages(): Promise<RecipePage[]> {
  const pages: RecipePage[] = [];
  const files = fs
    .readdirSync(path.join(process.cwd(), "src", "recipes"), {
      recursive: true,
      withFileTypes: true,
    })
    .filter((list) => !list.name.startsWith("_"));

  for (const file of files) {
    const isRecipe = !file.isDirectory();
    const fileNameSplit = file.parentPath.split("/");
    const path = [];

    let currentIndex = fileNameSplit.length - 1;
    let currentDirectory = fileNameSplit[currentIndex];
    // generate path heirarchy
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
}

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
  return string.replace(" ", "-");
}

export function deslugify(string: string): string {
  return string.replace("-", " ");
}
