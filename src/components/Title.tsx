"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, Fragment } from "react";

type Props = {
  separator?: string;
};

const separatorStyles = ["", "text-xs", "text-[0.5rem]", "text-[0.3rem]"];

export default function Title({ separator = "▽" }: Props) {
  let TitleTag: ElementType = "h1";

  const pathname = usePathname().split("/");

  return pathname.map((slug, idx) => {
    if (idx === 0) {
      return <TitleTag key={slug}>claire freehafer</TitleTag>;
    } else {
      TitleTag = `h${idx + 1}` as ElementType;
      return (
        <Fragment key={slug}>
          <div className={`${separatorStyles[idx]} my-1`}>{separator}</div>
          <TitleTag>
            <Link href={`/${pathname.slice(1, idx + 1).join("/")}`}>
              {slug}
            </Link>
          </TitleTag>
        </Fragment>
      );
    }
  });
}
