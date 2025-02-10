import fs from "fs";
import path from "path";
import { ListPage, MarkdownPage, RecipePage } from "./types";

export async function getLists(): Promise<ListPage[]> {
  const listData: any[] = [];
  const lists = fs
    .readdirSync(path.join(process.cwd(), "src", "lists"))
    .filter((list) => !list.startsWith("_"));

  for (const list of lists) {
    const listPage = await import(`@/lists/${list}`);
    listData.push({ ...listPage, slug: list.split(".")[0] });
  }
  return listData;
}

export async function getRecipes(): Promise<RecipePage[]> {
  const pages: MarkdownPage[] = [];
  const files = fs
    .readdirSync(path.join(process.cwd(), "src", "recipes"), {
      recursive: true,
      withFileTypes: true,
    })
    .filter((list) => !list.name.startsWith("_"));

  for (const file of files) {
    const recipeType = file.parentPath.includes("meals") ? "meal" : "cocktail";
    if (file.name.includes(".")) {
      const listPage = await import(`@/recipes/${recipeType}s/${file.name}`);
      pages.push({
        ...listPage,
        type: recipeType,
        slug: file.name.split(".")[0],
      });
    }
  }

  return pages;
}

export async function generateTags() {
  const tags: Record<string, any[]> = {};
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

export function slugify(string: string): string {
  return string.replace(" ", "-");
}
