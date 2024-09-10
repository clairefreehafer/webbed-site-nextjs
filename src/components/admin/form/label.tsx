import { cva } from "@panda/css";
import { ReactNode } from "react";

const label = cva({
  base: {
    alignItems: "center",
    borderColor: "white",
    display: "flex",
    height: "100%",
    textTransform: "uppercase",
  },
  variants: {
    align: {
      left: {
        justifyContent: "flex-start",
        textAlign: "left",
      },
      right: {
        justifyContent: "flex-end",
        borderRightWidth: "2px",
        pr: "2rem",
        textAlign: "right",
      },
    },
  },
});

type Props = {
  htmlFor: string;
  children: ReactNode;
  align?: "left" | "right";
};

export default function Label({ htmlFor, children, align = "right" }: Props) {
  return (
    <label htmlFor={htmlFor} className={label({ align })}>
      {children}
    </label>
  );
}
