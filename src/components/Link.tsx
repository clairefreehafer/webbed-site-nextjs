import { cva } from "@panda/css";
import Link, { LinkProps } from "next/link";

const link = cva({
  base: {
    textDecoration: "underline",
    _hover: { textDecoration: "none" },
    _visited: { textDecorationColor: "white" },
  },
});

type Props = LinkProps & {
  children: React.ReactNode;
};

export default function StyledLink({ href, children }: Props) {
  return (
    <Link href={href} className={link()}>
      {children}
    </Link>
  );
}
