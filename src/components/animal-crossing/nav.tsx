"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { getActiveNavLink } from "@/utils/client";

const NAV_LINKS = [
  {
    title: "home",
    path: "/",
    icon: "animal-crossing/icons/hhn",
  },
  {
    title: "art",
    path: "/art",
    icon: "animal-crossing/icons/camera",
  },
  {
    title: "recipes",
    path: "/recipes",
    icon: "animal-crossing/icons/recipes",
  },
  {
    title: "lists",
    path: "/lists",
    icon: "animal-crossing/icons/lists",
  },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <ul>
      {NAV_LINKS.map(({ path, title, icon }) => (
        <li className={getActiveNavLink(pathname, path)} key={title}>
          {icon ? (
            <Image
              src={`/images/${icon}.png`}
              alt=""
              className="icon"
              height={48}
              width={48}
            />
          ) : null}
          <a href={path}>{title}</a>
        </li>
      ))}
    </ul>
  );
}
