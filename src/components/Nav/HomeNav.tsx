import ScribbleButton from "@components/ScribbleButton";
import { css } from "@panda/css";

const grid = css({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  width: "100%",
});

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
    text: "storybook",
    scribbleText: "srybk",
    href: process.env.STORYBOOK_URL || "",
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
      {linksConfig.map(
        (link) => !link.hide && <ScribbleButton key={link.href} {...link} />
      )}
    </div>
  );
}
