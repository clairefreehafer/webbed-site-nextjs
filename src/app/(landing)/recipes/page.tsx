{
  /* <section className="content">

- 🍱 [meals](/recipes/meals)
- 🍸 [cocktails](/recipes/cocktails)
- 🛒 [ingredients](/recipes/ingredients)



</section> */
}

import ScribbleButton, {
  ScribbleButtonProps,
} from "@/components/default/scribble-button";
import Link from "next/link";

const links: ScribbleButtonProps[] = [
  {
    text: "meals",
    href: "/recipes/meals",
    scribbleText: "mls",
  },
  {
    text: "cocktails",
    href: "/recipes/cocktails",
    scribbleText: "cktl",
  },
  {
    text: "ingredients",
    href: "/recipes/ingredients",
    scribbleText: "ingrd",
  },
];

export default function Home() {
  return (
    <section className="content">
      <h1>recipes!</h1>
      <p>
        99% of these are not my own; source is included with each recipe. the
        versions on here may be slightly edited for my own taste or clarity.
      </p>
      <div className="grid">
        {links.map((link) => (
          <ScribbleButton {...link} key={link.href} />
        ))}
      </div>
      <p>
        <Link href="/">return home</Link>
      </p>
    </section>
  );
}
