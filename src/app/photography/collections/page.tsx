import Link from "next/link";
import { slugify } from "@/utils";
import TAGS from "./[collection]/tags";

export function generateMetadata() {
  return { title: "collections — claire freehafer" };
}

export default async function Page() {
  return (
    <ul>
      {TAGS.map((tag) => (
        <li key={tag}>
          <Link href={`/photography/collections/${slugify(tag)}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}
