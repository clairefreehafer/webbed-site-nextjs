"use client";
import { usePathname } from "next/navigation";
import ScribbleLink, { ScribbleLinkProps } from "./scribble-link";
import { getActiveNavLink } from "@/utils/client";

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
