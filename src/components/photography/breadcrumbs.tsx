"use client";
import "@/sass/photography/breadcrumbs.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { deslugify } from "@/utils/client";

export default function Breadcrumbs({
  pathOverride,
  border,
}: {
  pathOverride?: string;
  border?: boolean;
}) {
  const pathname = usePathname();

  const splitPathname = (pathOverride ?? pathname).split("/").slice(1);
  let currentPath = "";

  return (
    <nav id="breadcrumbs" className={`${border ? "dotted-border" : ""}`}>
      {splitPathname.map((path, index) => {
        currentPath += `/${path}`;
        if (index === splitPathname.length - 1) {
          return <h2 key={currentPath}>{deslugify(path)}</h2>;
        }
        return (
          <Fragment key={path}>
            <Link href={currentPath}>{deslugify(path)}</Link>
            <span>/</span>
          </Fragment>
        );
      })}
    </nav>
  );
}
