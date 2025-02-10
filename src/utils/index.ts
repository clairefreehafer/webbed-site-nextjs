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
    console.log(listPage);
    listData.push({ ...listPage, slug: list.split(".")[0] });
  }
  return listData;
}

export function slugify(string: string): string {
  return string.replace(" ", "-");
}
