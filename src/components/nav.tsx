"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Theme } from "@styles/theme";
import WiggleBox from "./photography/wiggle-box";
import { ReactNode } from "react";

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
];

type Props = {
  navLinks?: typeof defaultNavLinks;
  theme?: Theme;
  className?: string;
};

const navStyles: Record<Theme, string> = {
  default: "",
  notebook: "",
  animalCrossing: "flex items-middle ac-text-bg h-16 px-4",
  zelda: "zelda-text-bg",
  admin: "",
};

const linkStyles: Record<Theme, string> = {
  default: "",
  notebook: "text-xl",
  animalCrossing: "",
  zelda: "sheikah-underline mx-4 mt-2 p-0",
  admin: "text-limegreen",
};

const Li = ({ children }: { children: ReactNode }) => (
  <li className="group relative flex items-center">{children}</li>
);

export default function Navigation({
  navLinks = defaultNavLinks,
  theme = "default",
  className = "",
}: Props) {
  const pathname = usePathname();

  const isActive = (name: string) =>
    pathname.startsWith(`/${name.replaceAll(" ", "-")}`);

  return (
    <nav className={`${navStyles[theme]} ${className}`}>
      <ul className="flex list-none justify-center">
        {navLinks.map((link: NavLink) => (
          <Li key={link.pathname}>
            <WiggleBox theme={theme} />
            {link.image && <img src={link.image} alt="" />}
            <Link
              href={link.pathname}
              className={`relative z-10 block p-4 ${linkStyles[theme]}`}
            >
              {link.name === "photography" && isActive("photography") && (
                <>📷&nbsp;</>
              )}
              {link.name}
            </Link>
          </Li>
        ))}
        {process.env.NODE_ENV === "development" && (
          <Li>
            <WiggleBox theme={theme} />
            <Link
              href="/admin"
              className={`relative z-10 block p-4 ${linkStyles[theme]}`}
            >
              {isActive("admin") && <>&gt;&nbsp;</>}
              admin
            </Link>
          </Li>
        )}
      </ul>
    </nav>
  );
}
