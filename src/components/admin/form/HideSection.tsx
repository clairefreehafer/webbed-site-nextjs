import { ReactNode } from "react";
import { cva } from "@panda/css";

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
};

export default function HideSection({ when, children }: Props) {
  return <div className={hideSection({ when })}>{children}</div>;
}
