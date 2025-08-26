import { Metadata } from "next";

import ScribbleButtons from "@/components/default/scribble-buttons";
import { noRobots } from "@/utils";

export const metadata: Metadata = {
  title: "recipes",
  robots: noRobots,
};

const buttons = [
  {
    href: "/recipes/meals",
    text: "meals",
    scribbleText: "ml",
    emoji: "🍱",
  },
  {
    href: "/recipes/cocktails",
    text: "cocktails",
    scribbleText: "cks",
    emoji: "🍸",
  },
  {
    href: "/recipes/baking",
    text: "baking",
    scribbleText: "bkg",
    emoji: "🍰",
  },
  {
    href: "/recipes/ingredients",
    text: "ingredients",
    scribbleText: "ints",
    emoji: "🛒",
  },
];

export default function Page() {
  return (
    <section className="content">
      <p>
        99% of these are not my own; source is included with each recipe. the
        versions on here may be slightly edited for my own taste or clarity.
      </p>
      <ScribbleButtons buttons={buttons} />
    </section>
  );
}
