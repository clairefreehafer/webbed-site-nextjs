"use client";

import { RecipeVariant, css, cva } from "@panda/css";
import { zeldaTextBackground } from "@styles/zelda";
import { NavLink, defaultNavLinks } from "./config";
import { usePathname } from "next/navigation";
import LinkItem, { LinkItemProps } from "./LinkItem";
import { slugName } from "@utils/album";

const nav = cva({
  base: {
    display: "flex",
  },
  variants: {
    theme: {
      admin: {},
      animalCrossing: {
        layerStyle: "acnhTextBackground",
        alignItems: "center",
        height: "4rem",
        p: "0 1.5rem",
      },
      notebook: {
        fontFamily: "cutiveMono",
      },
      zelda: {
        ...zeldaTextBackground,
        p: "0.5rem 0 1.5rem",
      },
    },
  },
});

const list = css({
  display: "flex",
  gap: "1rem",
  justifyContent: "space-between",
  width: "100%",
});

type AvailableThemes =
  | LinkItemProps["theme"]
  | RecipeVariant<typeof nav>["theme"];

type Props = {
  navLinks?: typeof defaultNavLinks;
  theme?: AvailableThemes;
};

export default function Navigation({
  navLinks = defaultNavLinks,
  theme,
}: Props) {
  const pathname = usePathname();

  const isActive = (name: string) => pathname.startsWith(`/${slugName(name)}`);

  return (
    <nav className={nav({ theme })}>
      <ul className={list}>
        {navLinks.map((link: NavLink) => (
          <LinkItem
            theme={theme}
            link={link}
            key={link.pathname}
            isActive={isActive(link.name)}
          />
        ))}
      </ul>
    </nav>
  );
}
