import fs from "fs";
import path from "path";

export function getLists(): string[] {
  const lists = fs
    .readdirSync(path.join(process.cwd(), "src", "lists"))
    .filter((list) => !list.startsWith("_"));
  // return sans file extension
  return lists.map((list) => list.split(".")[0]);
}

export function slugify(string: string): string {
  return string.replace(" ", "-");
}
