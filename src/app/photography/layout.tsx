"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Menu from "@/components/photography/menu";
import "@/sass/photography/style.scss";

export default function Layout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const isPhotographyHome = pathname === "/photography";
  const [menuOpen, setMenuOpen] = useState(isPhotographyHome);

  return (
    <>
      <header>
        <h1>claire freehafer</h1>
        {!isPhotographyHome && (
          <button
            type="button"
            className="navigate"
            id="nav-button"
            onClick={() => {
              setMenuOpen((prevState) => !prevState);
            }}
          >
            navigate
          </button>
        )}
        <a href="/" className="home">
          return home
        </a>
      </header>

      <Menu menuOpen={menuOpen} />

      <section className="content">{children}</section>
    </>
  );
}
