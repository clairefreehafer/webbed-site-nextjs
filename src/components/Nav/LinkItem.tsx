import WiggleBox from "@components/photography/WiggleBox";
import { css, cva } from "@panda/css";
import { sheikahUnderline } from "@styles/zelda";
import Link from "next/link";
import { NavLink } from "./config";
import { ThemeName } from "@panda/themes";

const listItem = cva({
  base: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    p: "0.5rem 1rem",
    position: "relative",
    textDecoration: { base: "underline", _hover: "none" },
  },
  variants: {
    theme: {
      admin: {
        color: "limegreen",
      },
      animalCrossing: {},
      book: {},
      home: {},
      notebook: {},
      zelda: {
        ...sheikahUnderline,
        textDecoration: "none",
        p: 0,
        mx: "1rem",
        _hover: { color: "lightBlue" },
      },
    },
    state: {
      active: {
        textDecoration: "none",
      },
    },
  },
  compoundVariants: [
    {
      theme: "zelda",
      state: "active",
      css: {
        color: "lightBlue",
      },
    },
  ],
});

const linkStyle = css({
  display: "block",
  position: "relative",
  textAlign: "center",
  zIndex: 10,
});

export type LinkItemProps = {
  link: NavLink;
  theme?: ThemeName;
  isActive: boolean;
  // visible: boolean;
};

export default function LinkItem({ link, theme, isActive }: LinkItemProps) {
  return (
    <li
      className={`${listItem({ theme, state: isActive ? "active" : undefined })} group`}
    >
      <WiggleBox theme={theme} />
      {link.name === "storybook" ? (
        <a href={link.pathname} target="_blank">
          {link.name}
        </a>
      ) : (
        <Link href={link.pathname} className={`${linkStyle} peer`}>
          {link.name === "photography" && isActive && <>📷&nbsp;</>}
          {link.name === "admin" && isActive && "> "}
          {link.name}
        </Link>
      )}
    </li>
  );
}
