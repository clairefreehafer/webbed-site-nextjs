"use client";
import { usePathname } from "next/navigation";
import Name from "./name";
import "@/sass/zelda/header.scss";
import Link from "next/link";
import SheikahUnderline from "./sheikah-underline";

export default function Header() {
  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const backHref = `/${splitPathname
    .slice(1, splitPathname.length - 1)
    .join("/")}`;

  return (
    <header>
      <Name />
      <nav>
        <SheikahUnderline
          text={`back to ${backHref}`}
          textSize="0.5rem"
          gap="0.1rem"
        >
          <Link href={backHref}>&larr; back to {backHref}</Link>
        </SheikahUnderline>
      </nav>
    </header>
  );
}
