import ScribbleButton, {
  ScribbleButtonProps,
} from "@/components/default/scribble-button";
import "@/sass/global.scss";
import "@/sass/landing/style.scss";

const links: ScribbleButtonProps[] = [
  {
    text: "art",
    href: "/art",
    scribbleText: "ar",
  },
  {
    text: "recipes",
    href: "/recipes",
    scribbleText: "rcp",
  },
  {
    text: "lists",
    href: "/lists",
    scribbleText: "lst",
  },
];

const externalLinks: ScribbleButtonProps[] = [
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
  {
    text: "bookwyrm",
    href: "/lists",
    scribbleText: "bwym",
  },
];

export default function Home() {
  return (
    <section className="content">
      <h1>claire freehafer</h1>

      <h2>check out my shit!</h2>
      <div className="grid">
        {links.map((link) => (
          <ScribbleButton {...link} key={link.href} />
        ))}
      </div>

      <h2>external links</h2>
      <div className="grid">
        {externalLinks.map((link) => (
          <ScribbleButton {...link} key={link.href} />
        ))}
      </div>
    </section>
  );
}
