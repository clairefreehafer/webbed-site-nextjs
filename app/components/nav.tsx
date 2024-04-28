"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./nav.module.css";
import { NavLink } from "../config";
 
export default function Nav({ navLinks }: { navLinks: NavLink[] }) {
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
