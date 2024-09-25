"use client";
import { cva } from "@panda/css";
import { useTheme } from "@utils/styling";
import Link, { LinkProps } from "next/link";

const link = cva({
  base: {
    textDecoration: "underline",
    _hover: { textDecoration: "none" },
  },
  variants: {
    theme: {
      admin: {},
      animalCrossing: {
        // TODO: pick better colors, maybe grass colors?
        color: "brown",
        textDecorationStyle: "wavy",
        textDecorationThickness: "1.75px",
        textDecorationColor: "black",
        textShadow: "text",
        _hover: {
          color: "black",
          textShadow: "text",
        },
      },
      book: {
        textDecorationColor: "blue",
        _visited: {
          textDecorationColor: "purple",
        },
      },
      home: {
        _hover: {
          backgroundColor: "yellow",
          color: "black",
        },
      },
      notebook: {
        textDecorationStyle: "wavy",
        textDecorationThickness: "1.25px",
      },
      zelda: {},
    },
  },
});

type Props = LinkProps &
  React.ComponentProps<"a"> & {
    children: React.ReactNode;
  };

export default function StyledLink({ href, children, ...props }: Props) {
  const theme = useTheme();

  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a href={href} className={link({ theme })} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={link({ theme })} {...props}>
      {children}
    </Link>
  );
}
