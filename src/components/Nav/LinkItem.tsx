import WiggleBox from "@components/photography/wiggle-box";
import { css, cva } from "@panda/css";
import { sheikahUnderline } from "@themes/zelda";
import Link from "next/link";
import { NavLink } from "./config";
import { ThemeName } from "@panda/themes";

const linkStyles = {
  admin: () => "text-limegreen p-4",
};

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
      admin: {},
      animalCrossing: {},
      book: {},
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

export default function LinkItem({
  link,
  theme,
  isActive,
  // visible,
}: {
  link: NavLink;
  theme?: ThemeName;
  isActive: boolean;
  // visible: boolean;
}) {
  const linkClassName = ""; //`relative z-10 block underline hover:no-underline ${linkStyles[theme]?.(isActive)} ${isActive && "no-underline"}`;
  return (
    <li
      className={`${listItem({ theme, state: isActive ? "active" : undefined })} group`}
    >
      {/* // <li className="group relative flex items-center"> */}
      <WiggleBox theme={theme} />
      {link.image && <img src={link.image} alt="" />}
      {link.name === "storybook" ? (
        <a href={link.pathname} target="_blank" className={linkClassName}>
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
