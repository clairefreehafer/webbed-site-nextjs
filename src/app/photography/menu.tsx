"use client";

import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";
import { useEffect, useState } from "react";

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
          display: "curated",
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
  }, []);

  if (!links) {
    return null;
  }

  return <LinkList links={links} />;
}
