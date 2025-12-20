"use client";
import { usePathname } from "next/navigation";

import { getActiveNavLink } from "@/utils/client";

import ScribbleLink, { ScribbleLinkProps } from "./scribble-link";

const ROOT_LINKS: ScribbleLinkProps[] = [
  {
    href: "/",
    text: "home",
    scribbleText: "hm",
  },
  {
    href: "/art",
    text: "art",
    scribbleText: "r",
  },
  {
    href: "/recipes",
    text: "recipes",
    scribbleText: "rp",
  },
  {
    href: "/lists",
    text: "lists",
    scribbleText: "ls",
  },
  {
    href: "/library",
    text: "library",
    scribbleText: "lir",
  },
] as const;

export default function Nav() {
  const pathname = usePathname();
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {ROOT_LINKS.map((link) => (
        <li key={link.href} style={{ flex: 1 }}>
          <ScribbleLink
            {...link}
            className={`links-${ROOT_LINKS.length} ${getActiveNavLink(
              pathname,
              link.href
            )}`}
          />
        </li>
      ))}
    </ul>
  );
}
