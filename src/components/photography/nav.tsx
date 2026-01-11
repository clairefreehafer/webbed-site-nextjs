"use client";

import "@/sass/photography/nav.scss";

import Link from "next/link";
import { useState } from "react";

import { ROOT_LINKS } from "@/types/nav";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <details onToggle={() => setMenuOpen(!menuOpen)}>
        <summary>menu</summary>
      </details>
      {menuOpen && (
        <nav className="mobile-nav">
          <ul>
            {ROOT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <nav className="desktop-nav">
        <ul>
          {ROOT_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
