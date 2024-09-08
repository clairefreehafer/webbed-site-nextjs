"use client";

import { css, cva } from "@panda/css";
import { acnhTextBackground } from "@themes/animalCrossing";
import { zeldaTextBackground } from "@themes/zelda";
import { NavLink, defaultNavLinks } from "./config";
import { usePathname } from "next/navigation";
import { ThemeName } from "@panda/themes";
import LinkItem from "./LinkItem";
import { slugName } from "@utils/album";

const nav = cva({
  base: {
    display: "flex",
  },
  variants: {
    theme: {
      admin: {},
      animalCrossing: {
        ...acnhTextBackground,
        alignItems: "center",
        height: "4rem",
        p: "0 1.5rem",
      },
      book: {},
      notebook: {},
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

type Props = {
  navLinks?: typeof defaultNavLinks;
  theme?: ThemeName;
  fontClassName?: string;
};

export default function Navigation({
  navLinks = defaultNavLinks,
  theme,
  fontClassName = "",
}: Props) {
  const pathname = usePathname();

  const isActive = (name: string) => pathname.startsWith(`/${slugName(name)}`);

  return (
    <nav className={`${nav({ theme })} ${fontClassName}`}>
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