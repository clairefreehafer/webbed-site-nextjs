import "@/sass/terminal/nav.scss";

import Link from "next/link";

import { ROOT_LINKS } from "@/types/nav";

export default function Nav() {
  return (
    <nav>
      <ul className="nav-list">
        {ROOT_LINKS.map((link) => (
          <li key={link.href}>
            <span className="triangle" aria-hidden>
              ▶&nbsp;
            </span>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
