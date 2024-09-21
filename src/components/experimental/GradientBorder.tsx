import { css } from "@panda/css";
import { CSSProperties, ReactNode } from "react";
import { encodeNoiseSVG } from "./NoiseSVG";

type BorderPieces =
  | "topLeftCorner"
  | "topEdge"
  | "topRightCorner"
  | "rightEdge"
  | "bottomRightCorner"
  | "bottomEdge"
  | "bottomLeftCorner"
  | "leftEdge";

function gradients(
  backgroundColor: CSSProperties["backgroundColor"]
): Record<BorderPieces, CSSProperties["background"]> {
  return {
    topLeftCorner: `radial-gradient(circle at bottom right, ${backgroundColor}, transparent 70%, transparent)`,
    topEdge: `linear-gradient(transparent, ${backgroundColor})`,
    topRightCorner: `radial-gradient(circle at bottom left, ${backgroundColor}, transparent 70%, transparent)`,
    rightEdge: `linear-gradient(90deg, ${backgroundColor}, transparent)`,
    bottomRightCorner: `radial-gradient(circle at top left, ${backgroundColor}, transparent 70%, transparent)`,
    bottomEdge: `linear-gradient(${backgroundColor}, transparent)`,
    bottomLeftCorner: `radial-gradient(circle at top right, ${backgroundColor}, transparent 70%, transparent)`,
    leftEdge: `linear-gradient(90deg, transparent, ${backgroundColor})`,
  };
}

function generateStyleObject(
  piece: BorderPieces,
  {
    backgroundColor,
    contrast = 0,
    brightness = 0,
    noisy = false,
  }: Partial<Props>
): CSSProperties {
  return {
    background: `${gradients(backgroundColor)[piece]}${noisy ? `, url("data:image/svg+xml,${encodeNoiseSVG()}")` : ""}`,
    filter: `contrast(${contrast}%) brightness(${brightness}%)`,
  };
}

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
  contrast?: number;
  brightness?: number;
  noisy?: boolean;
  children: ReactNode;
};

export default function GradientBorder({
  borderSize,
  children,
  ...props
}: Props) {
  const gridContainer: CSSProperties = {
    gridTemplateColumns: `${borderSize} calc(100% - 2 * ${borderSize}) ${borderSize}`,
    gridTemplateRows: `${borderSize} calc(100% - 2 * ${borderSize}) ${borderSize}`,
  };

  const contents: CSSProperties = {
    backgroundColor: props.backgroundColor,
  };

  return (
    <div className={grid} style={gridContainer}>
      <div
        className={corner}
        style={generateStyleObject("topLeftCorner", props)}
      ></div>
      <div style={generateStyleObject("topEdge", props)}></div>
      <div
        className={corner}
        style={generateStyleObject("topRightCorner", props)}
      ></div>

      <div style={generateStyleObject("leftEdge", props)}></div>
      <div style={contents}>{children}</div>
      <div style={generateStyleObject("rightEdge", props)}></div>

      <div
        className={corner}
        style={generateStyleObject("bottomLeftCorner", props)}
      ></div>
      <div style={generateStyleObject("bottomEdge", props)}></div>
      <div
        className={corner}
        style={generateStyleObject("bottomRightCorner", props)}
      ></div>
    </div>
  );
}
