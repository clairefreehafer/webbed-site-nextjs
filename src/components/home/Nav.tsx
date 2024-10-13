import ScribbleButton from "@components/home/ScribbleButton";
import { css } from "@panda/css";

const grid = css({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  maxWidth: 750,
  width: "100%",
});

// TODO: try to consolidate with regular Nav
const linksConfig = [
  {
    text: "photography",
    scribbleText: "photo",
    href: "/photography",
  },
  {
    text: "animal crossing",
    scribbleText: "ancro",
    href: "/animal-crossing",
  },
  {
    text: "zelda",
    href: "/zelda",
  },
  {
    text: "lists",
    href: "/lists",
  },
  {
    text: "recipes",
    scribbleText: "rcps",
    href: "/recipes",
  },
  {
    text: "blog",
    href: "https://clairefreehafer.bearblog.dev",
  },
  {
    text: "storybook",
    scribbleText: "srybk",
    href: process.env.NEXT_PUBLIC_STORYBOOK_URL || "",
    target: "_blank",
  },
  {
    text: "admin",
    scribbleText: "adminn",
    href: "/admin",
    hide: process.env.NODE_ENV !== "development",
  },
];

export default function HomeNav() {
  return (
    <div className={grid}>
      {linksConfig.map(({ hide, ...rest }) =>
        !hide ? <ScribbleButton key={rest.href} {...rest} /> : null
      )}
    </div>
  );
}
