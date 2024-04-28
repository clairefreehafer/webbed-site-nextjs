"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./nav.module.css";

export type NavLink = {
  pathname: string;
  name: string;
}

const defaultNavLinks: NavLink[] = [
  {
    pathname: "/",
    name: "home",
  },
  {
    pathname: "/photography",
    name: "photography",
  },
  {
    pathname: "/animal-crossing",
    name: "animal crossing",
  }
]
 
export default function Nav({ navLinks = defaultNavLinks }) {
  const pathname = usePathname();
 
  return (
    <nav className={styles.nav}>
      <ul>
        {navLinks.map((link: NavLink) => (
          <Link
            key={link.pathname}
            className={`${styles.link} ${pathname === link.pathname ? styles.active : ""}`}
            href={link.pathname}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
