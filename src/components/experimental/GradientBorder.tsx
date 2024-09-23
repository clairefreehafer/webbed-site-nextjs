import { css } from "@panda/css";
import { CSSProperties, ReactNode, useMemo } from "react";
import { NoiseSVGProps, encodeNoiseSVG } from "./NoiseSVG";

type BorderPieces =
  | "topLeftCorner"
  | "topEdge"
  | "topRightCorner"
  | "rightEdge"
  | "bottomRightCorner"
  | "bottomEdge"
  | "bottomLeftCorner"
  | "leftEdge";

// TODO: make gradient stops more dynamic, or even add more than one? :o
function gradients(
  gradientColor: CSSProperties["backgroundColor"]
): Record<BorderPieces, CSSProperties["background"]> {
  return {
    topLeftCorner: `radial-gradient(circle at bottom right, ${gradientColor}, transparent 70%, transparent)`,
    topEdge: `linear-gradient(transparent, ${gradientColor})`,
    topRightCorner: `radial-gradient(circle at bottom left, ${gradientColor}, transparent 70%, transparent)`,
    rightEdge: `linear-gradient(90deg, ${gradientColor}, transparent)`,
    bottomRightCorner: `radial-gradient(circle at top left, ${gradientColor}, transparent 70%, transparent)`,
    bottomEdge: `linear-gradient(${gradientColor}, transparent)`,
    bottomLeftCorner: `radial-gradient(circle at top right, ${gradientColor}, transparent 70%, transparent)`,
    leftEdge: `linear-gradient(90deg, transparent, ${gradientColor})`,
  };
}

function generateStyleObject(
  piece: BorderPieces | "content",
  {
    gradientColor,
    noisy = false,
    contrast,
    brightness,
    invert,
    ...props
  }: Partial<Props>
): CSSProperties {
  if (piece === "content") {
    if (noisy) {
      return {
        backgroundColor: gradientColor,
        background: `${gradientColor}, url("data:image/svg+xml,${encodeNoiseSVG(props)}")`,
        filter: `contrast(${contrast}%) brightness(${brightness}%)`,
      };
    }
    return {
      backgroundColor: gradientColor,
      filter: invert ? "invert(100%)" : "",
    };
  }
  return {
    background: `${gradients(gradientColor)[piece]}${noisy ? `, url("data:image/svg+xml,${encodeNoiseSVG(props)}")` : ""}`,
    filter: noisy ? `contrast(${contrast}%) brightness(${brightness}%)` : "",
  };
}

const grid = css({
  display: "grid",
});

const corner = css({
  height: "100%",
  width: "100%",
});

const isolate = css({
  isolation: "isolate",
  position: "relative",
});

// TODO: test other blend modes
const blendMultiply = css({
  height: "100%",
  left: 0,
  mixBlendMode: "multiply",
  position: "absolute",
  top: 0,
  width: "100%",
});

type Props = NoiseSVGProps & {
  borderSize: string;
  children: ReactNode;

  gradientColor: CSSProperties["color"];
  noisy?: boolean;
  /** for blending in a noisy gradient to a colored background. */
  backgroundColor?: CSSProperties["color"];
  contrast?: number;
  brightness?: number;
  // TODO: number
  invert?: boolean;
};

export default function GradientBorder({
  borderSize,
  children,
  backgroundColor = "transparent",
  ...props
}: Props) {
  const gridContainer: CSSProperties = useMemo(
    () => ({
      gridTemplateColumns: `${borderSize} calc(100% - 2 * ${borderSize}) ${borderSize}`,
      gridTemplateRows: `${borderSize} calc(100% - 2 * ${borderSize}) ${borderSize}`,
    }),
    [borderSize]
  );

  const background: CSSProperties = {
    backgroundColor,
  };

  return (
    <div
      className={isolate}
      style={props.invert ? { filter: "invert(100%)" } : {}}
    >
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
        <div style={generateStyleObject("content", props)}>{children}</div>
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
      {/* TODO: test other blend modes + putting this above the gradient */}
      {props.noisy && (
        <div className={blendMultiply} style={{ backgroundColor }}></div>
      )}
    </div>
  );
}
