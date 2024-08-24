import Link from "next/link";
import lists from "./lists.json";
import { slugName } from "@utils/albums";

export default function Page() {
  return (
    <ul>
      {lists.map((listItem, idx) => (
        <li key={idx}>
          <Link href={`/lists/${slugName(listItem.title)}`}>
            {listItem.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
