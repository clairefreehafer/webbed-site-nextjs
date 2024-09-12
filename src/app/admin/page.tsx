"use client";

import { css, cx } from "@panda/css";
import Link from "next/link";
import { useState } from "react";

const links = ["sections", "albums", "photos", "tags", "icons"] as const;

const linkList = css({
  display: "flex",
  fontFamily: "pressStart2P",
  justifyContent: "space-around",
  my: "3rem",
  width: "100%",
});

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
