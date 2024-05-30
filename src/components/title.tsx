import Link from "next/link";
import { ElementType, Fragment } from "react";

type Props = {
  pathname: string[];
  separator?: string;
};

const separatorStyles = ["", "text-xs", "text-[0.5rem]", "text-[0.3rem]"];

export default function Title({ pathname, separator = "▽" }: Props) {
  let TitleTag: ElementType = "h1";

  return pathname.map((slug, idx) => {
    if (idx === 0) {
      return (
        <TitleTag key={slug} className="mb-2">
          claire freehafer
        </TitleTag>
      );
    } else {
      TitleTag = `h${idx + 1}` as ElementType;
      return (
        <Fragment key={slug}>
          <div className={`${separatorStyles[idx]} my-1`}>{separator}</div>
          <TitleTag className="mb-2">
            <Link href={`/${pathname.slice(1, idx + 1).join("/")}`}>
              {slug}
            </Link>
          </TitleTag>
        </Fragment>
      );
    }
  });
}
