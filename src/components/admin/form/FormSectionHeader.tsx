import { css } from "@panda/css";
import { ReactNode } from "react";

const h5 = css({
  fontSize: "1.75rem",
  gridColumn: "span 2",
  textAlign: "center",
  textTransform: "uppercase",
});

type Props = {
  children: ReactNode;
};

export default function SectionHeader({ children }: Props) {
  return <h5 className={h5}>{children}</h5>;
}
