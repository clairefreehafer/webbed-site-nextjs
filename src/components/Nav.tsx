"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Theme, ThemeStyles } from "@themes";
import WiggleBox from "./photography/wiggle-box";
import { slugName } from "@utils/album";

export type NavLink = {
  pathname: string;
  name: string;
  image?: string;
};

const defaultNavLinks: NavLink[] = [
  {
    pathname: "/",
    name: "home",
  },
  {
    pathname: "/photography",
    name: "photography",
  },
  {
    pathname: "/animal-crossing",
    name: "animal crossing",
  },
  {
    pathname: "/zelda",
    name: "zelda",
  },
  {
    pathname: process.env.STORYBOOK_URL || "",
    name: "storybook",
  },
];

const adminLink: NavLink = {
  pathname: "/admin",
  name: "admin",
};

type Props = {
  navLinks?: typeof defaultNavLinks;
  theme?: Theme;
  className?: string;
};

const navStyles: ThemeStyles = {
  default: "",
  notebook: "",
  animalCrossing: "flex items-middle ac-text-bg h-16 px-4",
  zelda: "zelda-text-bg pt-2 pb-6",
  admin: "",
};

const linkStyles: ThemeStyles<(isActive?: boolean) => string> = {
  default: () => "p-4",
  notebook: () => "text-xl p-4",
  animalCrossing: () => "px-4",
  zelda: (isActive) =>
    `sheikah-underline mx-6 mt-2 hover:text-light-blue ${isActive && "text-light-blue"}`,
  admin: () => "text-limegreen p-4",
};

const LinkItem = ({
  link,
  theme,
  isActive,
}: {
  link: NavLink;
  theme: Theme;
  isActive: boolean;
}) => {
  const linkClassName = `relative z-10 block underline hover:no-underline ${linkStyles[theme]?.(isActive)} ${isActive && "no-underline"}`;
  return (
    <li className="group relative flex items-center">
      <WiggleBox theme={theme} />
      {link.image && <img src={link.image} alt="" />}
      {link.name === "storybook" ? (
        <a href={link.pathname} target="_blank" className={linkClassName}>
          {link.name}
        </a>
      ) : (
        <Link href={link.pathname} className={linkClassName}>
          {link.name === "photography" && isActive && <>📷&nbsp;</>}
          {link.name === "admin" && isActive && "> "}
          {link.name}
        </Link>
      )}
    </li>
  );
};

export default function Navigation({
  navLinks = defaultNavLinks,
  theme = "default",
  className = "",
}: Props) {
  const pathname = usePathname();

  const isActive = (name: string) => pathname.startsWith(`/${slugName(name)}`);

  return (
    <nav className={`${navStyles[theme]} ${className}`}>
      <ul className="flex list-none justify-center">
        {navLinks.map((link: NavLink) => (
          <LinkItem
            theme={theme}
            link={link}
            key={link.pathname}
            isActive={isActive(link.name)}
          />
        ))}
        {process.env.NODE_ENV === "development" && (
          <LinkItem
            theme={theme}
            link={adminLink}
            isActive={isActive("admin")}
          />
        )}
      </ul>
    </nav>
  );
}
