import Link from "next/link";
// TODO: add to db
import lists from "./lists.json";
import { slugName } from "@utils/album";

export default function Page() {
  return (
    <>
      <h1>lists</h1>
      <p>i like to make lists. :)</p>
      <ul>
        {lists.map((listItem, idx) => (
          <li key={idx}>
            <Link href={`/lists/${slugName(listItem.title)}`}>
              {listItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
