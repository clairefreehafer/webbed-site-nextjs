"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import navLinks from "./config";
import styles from "./nav.module.css";
 
export default function Nav() {
  const pathname = usePathname();
 
  return (
    <nav className={styles.nav}>
      <ul>
        {navLinks.map((link) => (
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
