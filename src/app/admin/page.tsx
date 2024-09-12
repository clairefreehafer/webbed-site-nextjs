"use client";

import { pressStart2P } from "@fonts";
import { css, cx } from "@panda/css";
import Link from "next/link";
import { useState } from "react";

const links = ["sections", "albums", "photos", "tags", "icons"] as const;

// `${pressStart2P.className} mx-auto my-12 flex w-full justify-around`
const linkList = cx(
  pressStart2P.className,
  css({
    display: "flex",
    justifyContent: "space-around",
    my: "3rem",
    width: "100%",
  }),
);

const hoverStyles = css({
  opacity: 1,
});

const unHoverStyles = css({
  opacity: 0,
});

export default function AdminPage() {
  const [selected, setSelected] = useState<number>();

  function handleHover(index: number) {
    setSelected(index);
  }

  return (
    <ul className={linkList}>
      {links.map((link, idx) => (
        <li key={link}>
          <span className={idx === selected ? hoverStyles : unHoverStyles}>
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
