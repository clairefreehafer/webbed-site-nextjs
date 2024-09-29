import { ReactNode } from "react";
import { cva, cx } from "@panda/css";

const hideSection = cva({
  base: {
    gridColumn: "span 2",
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: "25% 1fr",
    width: "100%",
  },
  variants: {
    when: {
      true: {
        height: 0,
        overflow: "hidden",
        visibility: "hidden",
      },
    },
  },
});

type Props = {
  when: boolean;
  children: ReactNode;
  className?: string;
};

export default function HideSection({ when, className = "", children }: Props) {
  return <div className={cx(hideSection({ when }), className)}>{children}</div>;
}
