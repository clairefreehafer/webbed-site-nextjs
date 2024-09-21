"use client";

import { RecipeVariant, css, cva } from "@panda/css";
import { displayName } from "@utils/album";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";

const container = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
});

const title = cva({
  base: {
    _before: {
      lineHeight: "1.25rem",
    },
  },
  variants: {
    component: {
      h1: {
        fontSize: "2.5rem",
        _before: {
          display: "none",
        },
      },
      h2: {
        fontSize: "2rem",
      },
      h3: {
        fontSize: "1.5rem",
      },
      h4: {
        fontSize: "1.25rem",
      },
    },
    theme: {
      admin: {
        _before: {
          content: "'▼'",
        },
      },
      book: {
        _before: {
          content: "'❦'",
        },
      },
      notebook: {
        _before: {
          content: "'▽'",
        },
      },
    },
  },
});

type TitleRecipe = RecipeVariant<typeof title>;

type Props = Pick<TitleRecipe, "theme">;

// TODO: desktop version horizontal, mobile vertical
export default function Title({ theme }: Props) {
  let TitleTag: ElementType = "h1";

  const pathname = usePathname().split("/");

  return (
    <div className={container}>
      {pathname.map((slug, idx) => {
        if (idx === 0) {
          return (
            <TitleTag
              key={slug}
              className={title({
                component: TitleTag as TitleRecipe["component"],
                theme,
              })}
            >
              claire freehafer
            </TitleTag>
          );
        } else {
          TitleTag = `h${idx + 1}` as ElementType;
          return (
            <TitleTag
              key={slug}
              className={`
                ${container}
                ${title({ component: TitleTag as TitleRecipe["component"], theme })}
              `}
            >
              <Link href={`/${pathname.slice(1, idx + 1).join("/")}`}>
                {displayName(slug)}
              </Link>
            </TitleTag>
          );
        }
      })}
    </div>
  );
}
