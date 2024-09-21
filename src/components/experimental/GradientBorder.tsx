import { css } from "@panda/css";
import { CSSProperties, ReactNode } from "react";

const grid = css({
  display: "grid",
});

const corner = css({
  height: "100%",
  width: "100%",
});

type Props = {
  backgroundColor: CSSProperties["backgroundColor"];
  borderSize: string;
  children: ReactNode;
};

export default function GradientBorder({
  backgroundColor,
  children,
  borderSize,
}: Props) {
  const gridContainer: CSSProperties = {
    gridTemplateColumns: `${borderSize} calc(100% - 2 * ${borderSize}) ${borderSize}`,
    gridTemplateRows: `${borderSize} calc(100% - 2 * ${borderSize}) ${borderSize}`,
  };

  const topLeftCorner: CSSProperties = {
    background: `radial-gradient(circle at bottom right, ${backgroundColor}, transparent 70%, transparent)`,
  };

  const topEdge: CSSProperties = {
    background: `linear-gradient(transparent, ${backgroundColor})`,
  };

  const topRightCorner: CSSProperties = {
    background: `radial-gradient(circle at bottom left, ${backgroundColor}, transparent 70%, transparent)`,
  };

  const rightEdge: CSSProperties = {
    background: `linear-gradient(90deg, ${backgroundColor}, transparent)`,
  };

  const bottomRightCorner: CSSProperties = {
    background: `radial-gradient(circle at top left, ${backgroundColor}, transparent 70%, transparent)`,
  };

  const bottomEdge: CSSProperties = {
    background: `linear-gradient(${backgroundColor}, transparent)`,
  };

  const bottomLeftCorner: CSSProperties = {
    background: `radial-gradient(circle at top right, ${backgroundColor}, transparent 70%, transparent)`,
  };

  const leftEdge: CSSProperties = {
    background: `linear-gradient(90deg, transparent, ${backgroundColor})`,
  };

  const contents: CSSProperties = {
    backgroundColor,
  };

  return (
    <div className={grid} style={gridContainer}>
      <div className={corner} style={topLeftCorner}></div>
      <div style={topEdge}></div>
      <div className={corner} style={topRightCorner}></div>

      <div style={leftEdge}></div>
      <div style={contents}>{children}</div>
      <div style={rightEdge}></div>

      <div className={corner} style={bottomLeftCorner}></div>
      <div style={bottomEdge}></div>
      <div className={corner} style={bottomRightCorner}></div>
    </div>
  );
}
