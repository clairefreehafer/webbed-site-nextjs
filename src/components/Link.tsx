"use client";
import { cx } from "@panda/css";
import { linkSlotRecipe } from "@panda/recipes";
import { token } from "@panda/tokens";
import { getGrassDateRange } from "@utils/animalCrossing";
import { useTheme } from "@utils/styling";
import Link, { LinkProps } from "next/link";

type Props = LinkProps &
  React.ComponentProps<"a"> & {
    children: React.ReactNode;
  };

export default function StyledLink({
  href,
  children,
  className = "",
  ...props
}: Props) {
  const theme = useTheme();
  const { link, prefix } = linkSlotRecipe({ theme });
  const linkStyle =
    theme === "animalCrossing"
      ? { textDecorationColor: token(`colors.grass.${getGrassDateRange()}`) }
      : {};

  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cx(link, "group", className)}
        style={linkStyle}
        {...props}
      >
        <span className={prefix}>▶&nbsp;</span>
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cx(link, "group", className)}
      style={linkStyle}
      {...props}
    >
      <span className={prefix}>▶&nbsp;</span>
      {children}
    </Link>
  );
}
