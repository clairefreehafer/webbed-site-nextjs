"use client";

import { pressStart2P } from "@fonts";
import Link from "next/link";
import { useState } from "react";

const links = ["sections", "albums", "photos", "tags", "icons"];

export default function AdminPage() {
  const [selected, setSelected] = useState<number>();

  function handleHover(index: number) {
    setSelected(index);
  }

  return (
    <ul
      className={`${pressStart2P.className} mx-auto my-12 flex w-full justify-around`}
    >
      {links.map((link, idx) => (
        <li>
          <span className={idx === selected ? "opacity-1" : "opacity-0"}>
            ▶&nbsp;
          </span>
          <Link href={`/admin/${link}`} onMouseOver={() => handleHover(idx)}>
            {link}
          </Link>
        </li>
      ))}
    </ul>
  );
}
