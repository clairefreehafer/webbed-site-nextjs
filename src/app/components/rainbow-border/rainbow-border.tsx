"use client";

import styles from "./rainbow-border.module.scss";
import "./rainbow-border.scss";

const { container, content, sides } = styles;

type Sides = "top" | "right" | "bottom" | "left";

// TODO: add size prop?
export default function RainbowBorder({
  children,
  hideBorder = [],
  borderWidth = 2,
}: {
  children: Readonly<React.ReactNode>,
  hideBorder?: Sides[],
  borderWidth?: number;
}) {
  const hideBorders = hideBorder.join(" hide-");

  return (
    <div className={`${container} hide-${hideBorders}`} style={{ borderWidth }}>
      <div className={content}>
        {children}
      </div>
    </div>
  );
}