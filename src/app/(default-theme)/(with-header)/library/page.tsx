import { Metadata } from "next";
import Link from "next/link";

import { noRobots } from "@/utils";
import { getShelves } from "@/utils/library";

export const metadata: Metadata = {
  title: "library",
  robots: noRobots,
};

export default async function Page() {
  const shelvesJson = await getShelves();

  return (
    <section className="content">
      <p>since i don&apos;t have the space or resources for a real library.</p>

      <ul>
        {shelvesJson.map((shelf) => (
          <li key={shelf.slug}>
            <Link href={`/library/${shelf.slug}`}>{shelf.title}</Link>
            {shelf.description && ` — ${shelf.description}`}
          </li>
        ))}
      </ul>
      <p>library data sourced from:</p>
      <ul>
        <li>
          <a href="" target="_blank">
            open library
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            the tvdb
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            igdb
          </a>
        </li>
      </ul>
    </section>
  );
}
