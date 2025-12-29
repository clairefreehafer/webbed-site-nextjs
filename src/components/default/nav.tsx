"use client";
import { usePathname } from "next/navigation";

import { ROOT_LINKS } from "@/types/nav";
import { getActiveNavLink } from "@/utils/client";

import ScribbleLink from "./scribble-link";

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
