import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "recipes — claire freehafer",
};

export default function Page() {
  return (
    <section className="content">
      <p>
        99% of these are not my own; source is included with each recipe. the
        versions on here may be slightly edited for my own taste or clarity.
      </p>
      <ul>
        <li>
          🍱 <Link href="/recipes/meals">meals</Link>
        </li>
        <li>
          🍸 <Link href="/recipes/cocktails">cocktails</Link>
        </li>
        <li>
          🛒 <Link href="/recipes/ingredients">ingredients</Link>
        </li>
      </ul>
    </section>
  );
}
