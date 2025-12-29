import "@/sass/photography/nav.scss";

import Link from "next/link";

import { ROOT_LINKS } from "@/types/nav";

export default function Nav() {
  return (
    <nav>
      <ul>
        {ROOT_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
