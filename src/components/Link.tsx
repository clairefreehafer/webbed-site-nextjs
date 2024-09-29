"use client";
import { cx } from "@panda/css";
import { linkSlotRecipe } from "@panda/recipes";
import { useTheme } from "@utils/styling";
import Link, { LinkProps } from "next/link";

type Props = LinkProps &
  React.ComponentProps<"a"> & {
    children: React.ReactNode;
  };

export default function StyledLink({ href, children, ...props }: Props) {
  const theme = useTheme();
  const { link, prefix } = linkSlotRecipe({ theme });

  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a href={href} className={cx(link, "group")} {...props}>
        <span className={prefix}>▶&nbsp;</span>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cx(link, "group")} {...props}>
      <span className={prefix}>▶&nbsp;</span>
      {children}
    </Link>
  );
}
