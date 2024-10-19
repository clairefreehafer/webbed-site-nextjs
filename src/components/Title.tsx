"use client";

import { RecipeVariant, cva } from "@panda/css";
import { displayName } from "@utils/album";
import { useTheme } from "@utils/styling";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";

const container = cva({
  base: {
    display: "flex",
    flexDir: "column",
    alignItems: "center",
  },
  variants: {
    theme: {
      admin: {
        boxShadow: "8BitWhite",
        color: "white",
        fontFamily: "pressStart2P",
        p: "1rem",
      },
      animalCrossing: {},
      book: {
        fontFamily: "times new roman",
      },
      home: {},
      notebook: {
        // https://codepen.io/mp/pen/kBEeKw
        // (another option: https://codepen.io/tmrDevelops/pen/NPXodB)
        // or open props border
        borderColor: "white",
        borderRadius: "95% 4% 92% 5% / 4% 95% 6% 95%",
        borderWidth: "3px 4px 3px 5px",
        fontFamily: "loveYaLikeASister",
        color: "white",
        my: "1rem",
        p: "1rem",
        width: "auto",
      },
      zelda: {},
    },
  },
});

const title = cva({
  base: {
    display: "flex",
    flexDir: "column",
    alignItems: "center",
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
      animalCrossing: {},
      book: {
        _before: {
          content: "'❦'",
        },
      },
      home: {},
      notebook: {
        _before: {
          content: "'▽'",
        },
      },
      zelda: {},
    },
  },
  compoundVariants: [
    {
      theme: "admin",
      component: "h2",
      css: {
        _before: {
          fontSize: "1rem",
        },
      },
    },
    {
      theme: "admin",
      component: "h3",
      css: {
        _before: {
          fontSize: "0.75rem",
        },
      },
    },
    {
      theme: "admin",
      component: "h4",
      css: {
        _before: {
          fontSize: "0.5rem",
        },
      },
    },
  ],
});

type TitleRecipe = RecipeVariant<typeof title>;

// TODO: desktop version horizontal, mobile vertical
export default function Title() {
  const theme = useTheme();
  let TitleTag: ElementType = "h1";

  const pathname = usePathname().split("/");

  return (
    <div className={container({ theme })}>
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
              className={title({
                component: TitleTag as TitleRecipe["component"],
                theme,
              })}
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
