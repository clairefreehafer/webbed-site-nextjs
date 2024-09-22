import { RecipeVariantProps, cva } from "@panda/css";
import Link, { LinkProps } from "next/link";

const link = cva({
  base: {
    textDecoration: "underline",
    _hover: { textDecoration: "none" },
  },
  variants: {
    theme: {
      book: {
        textDecorationColor: "blue",
        _visited: {
          textDecorationColor: "purple",
        },
      },
    },
  },
});

type Props = LinkProps &
  RecipeVariantProps<typeof link> &
  React.ComponentProps<"a"> & {
    children: React.ReactNode;
  };

export default function StyledLink({ href, children, theme, ...props }: Props) {
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
