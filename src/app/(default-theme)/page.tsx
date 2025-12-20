import ScribbleButtons from "@/components/default/scribble-buttons";
import { ScribbleLinkProps } from "@/components/default/scribble-link";

const links: ScribbleLinkProps[] = [
  {
    text: "art",
    href: "/art",
    scribbleText: "a",
  },
  {
    text: "recipes",
    href: "/recipes",
    scribbleText: "rp",
  },
  {
    text: "lists",
    href: "/lists",
    scribbleText: "lt",
  },
  {
    text: "library",
    href: "library",
    scribbleText: "lib",
  },
];

const externalLinks: ScribbleLinkProps[] = [
  {
    text: "bookwyrm",
    href: "https://bookwyrm.social/user/loam",
    scribbleText: "bwym",
  },
  {
    text: "github",
    href: "https://www.github.com/clairefreehafer",
    scribbleText: "git",
  },
  {
    text: "linkedin",
    href: "https://www.linkedin.com/in/clairefreehafer",
    scribbleText: "lkin",
  },
];

export default function Page() {
  return (
    <div className="landing">
      <h1>
        <span aria-hidden>🗣️</span>
        <span>claire freehafer</span>
        <span aria-hidden>💥</span>
      </h1>

      <h2>
        <span>👇🏻</span>
        <span>check out my shit!</span>
        <span>💩</span>
      </h2>
      <ScribbleButtons buttons={links} />

      <h2>
        <span>👋🏻</span>
        <span>external links</span>
        <span>🔗</span>{" "}
      </h2>
      <ScribbleButtons buttons={externalLinks} />
    </div>
  );
}
