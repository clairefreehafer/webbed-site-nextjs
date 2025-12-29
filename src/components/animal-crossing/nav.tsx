"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ROOT_LINKS } from "@/types/nav";
import { getActiveNavLink } from "@/utils/client";

export default function Nav() {
  const pathname = usePathname();
  return (
    <ul>
      {ROOT_LINKS.map(({ href, text, animalCrossingIcon }) => (
        <li className={getActiveNavLink(pathname, href)} key={text}>
          {animalCrossingIcon ? (
            <Image
              src={`/images/${animalCrossingIcon}.png`}
              alt=""
              className="icon"
              height={48}
              width={48}
            />
          ) : null}
          <a href={href}>{text}</a>
        </li>
      ))}
    </ul>
  );
}
