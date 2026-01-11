"use client";

import { useEffect, useState } from "react";

import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";

export default function Menu() {
  const [links, setLinks] = useState<PhotographyPageLink[]>();

  useEffect(() => {
    if (!links) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      setLinks([
        {
          display: "today",
          href: `/today/${mm}/${dd}`,
        },
        {
          display: "albums",
          href: "/albums",
        },
        {
          display: "collections",
          href: "/collections",
        },
        {
          display: "technical",
          href: "/technical",
        },
        {
          display: "map",
          href: "/map",
        },
        {
          display: "random",
          href: "/random",
        },
      ]);
    }
  }, [links]);

  if (!links) {
    return null;
  }

  return <LinkList links={links} />;
}
