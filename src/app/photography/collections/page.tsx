import Link from "next/link";
import { TAGS } from "./[collection]/page";
import { slugify } from "@/utils";

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
