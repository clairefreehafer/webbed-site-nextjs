import "@/sass/zelda/nav.scss";

import Link from "next/link";

import { ROOT_LINKS } from "@/types/nav";

import SheikahUnderline from "./sheikah-underline";

export default function Nav() {
  return (
    <nav>
      <ul>
        {ROOT_LINKS.map(({ href, text }) => (
          <li key={text}>
            <SheikahUnderline text={text} textSize="0.7rem" gap="0.1rem">
              <Link href={href}>{text}</Link>
            </SheikahUnderline>
          </li>
        ))}
      </ul>
    </nav>
  );
}
