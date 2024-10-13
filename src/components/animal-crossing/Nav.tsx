"use client";

import { css } from "@panda/css";
import { defaultNavLinks } from "@components/Nav/config";
import StyledLink from "@components/Link";
import { Prisma } from "@prisma/client";
import DisplayIcon from "@components/Icon/Icon";
import { findManyIcons } from "@utils/prisma/icon";

const navLinks = [
  {
    pathname: "/",
    name: "home",
    // hhn
    iconId: 12,
  },
  {
    pathname: "/photography",
    name: "photography",
    // camera
    iconId: 8,
  },
  {
    pathname: "/animal-crossing",
    name: "animal crossing",
    // furniture
    iconId: 9,
  },
  {
    pathname: "/zelda",
    name: "zelda",
    // ocarina
    iconId: 10,
  },
  {
    pathname: "/lists",
    name: "lists",
    iconId: 13,
  },
  {
    pathname: process.env.NEXT_PUBLIC_STORYBOOK_URL || "",
    name: "storybook",
    hide: !!process.env.STORYBOOK_URL,
    // book
    iconId: 11,
  },
  {
    pathname: "/admin",
    name: "admin",
    hide: process.env.NODE_ENV !== "development",
  },
];

const nav = css({
  layerStyle: "acnhTextBackground",
  // alignItems: "center",
  // display: "flex",
  // flexDir: "column",
  gridArea: "nav",
  height: "auto",
  p: "1.5rem",
});

const list = css({
  display: "flex",
  flexDir: "column",
  gap: "1rem",
});

const listItem = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDir: "column",
  // p: "0.5rem 1rem",
});

const activeLink = css({
  textDecoration: "none",
});

type Props = {
  navLinks?: typeof defaultNavLinks;
  icons: Prisma.PromiseReturnType<typeof findManyIcons>;
};

export default function AnimalCrossingNav({ icons }: Props) {
  return (
    <nav className={nav}>
      <ul className={list}>
        {navLinks.map((link) => (
          <li key={link.pathname} className={listItem}>
            <DisplayIcon
              icon={icons.find((icon) => icon.id === link.iconId) ?? null}
              display="solo"
            />
            <StyledLink
              href={link.pathname}
              className={link.name === "animal crossing" ? activeLink : ""}
            >
              {link.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
