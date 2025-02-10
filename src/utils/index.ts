import fs from "fs";
import path from "path";
import { ListPage } from "./types";

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

export function slugify(string: string): string {
  return string.replace(" ", "-");
}
