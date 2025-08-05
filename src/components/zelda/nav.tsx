import "@/sass/zelda/nav.scss";

import Link from "next/link";

import { ROOT_LINKS } from "@/utils/constants";

import SheikahUnderline from "./sheikah-underline";

export default function Nav() {
  return (
    <nav>
      <ul>
        {ROOT_LINKS.map(({ path, title }) => (
          <li key={title}>
            <SheikahUnderline text={title} textSize="0.7rem" gap="0.1rem">
              <Link href={path}>{title}</Link>
            </SheikahUnderline>
          </li>
        ))}
      </ul>
    </nav>
  );
}
