import { ReactNode } from "react";

type Props = {
  htmlFor: string;
  children: ReactNode;
  align?: "left" | "right";
};

export default function Label({ htmlFor, children, align = "right" }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex items-center border-white uppercase ${align === "right" ? "justify-end border-r-2 pr-4 text-right" : "justify-start border-0"}`}
    >
      {children}
    </label>
  );
}
