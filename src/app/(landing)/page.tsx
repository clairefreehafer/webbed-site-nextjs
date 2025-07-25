import ScribbleButton, {
  ScribbleButtonProps,
} from "@/components/default/scribble-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "claire freehafer",
};

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
    <section className="content">
      <h1>🗣️ claire freehafer 💥</h1>

      <h2>👇🏻 check out my shit! 💩</h2>
      <div className="link-container">
        {links.map((link) => (
          <ScribbleButton
            {...link}
            className={`links-${links.length}`}
            key={link.href}
          />
        ))}
      </div>

      <h2>👋🏻 external links 🔗</h2>
      <div className="link-container">
        {externalLinks.map((link) => (
          <ScribbleButton
            {...link}
            className={`links-${externalLinks.length}`}
            key={link.href}
          />
        ))}
      </div>
    </section>
  );
}
