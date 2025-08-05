import "@/sass/terminal/nav.scss";

import Link from "next/link";

import { ROOT_LINKS } from "@/utils/constants";

export default function Nav() {
  return (
    <nav>
      <ul>
        {ROOT_LINKS.map((link) => (
          <li key={link.path}>
            <span className="triangle" aria-hidden>
              ▶&nbsp;
            </span>
            <Link href={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
