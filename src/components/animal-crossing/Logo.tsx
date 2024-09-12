import { finkHeavy } from "@fonts/animal-crossing";
import { css, cx } from "@panda/css";
import { CSSProperties } from "react";

export const SVG_HEIGHT = "70px";

const svg = cx(
  finkHeavy.className,
  css({
    fill: "rgba(231, 197, 73, 1)",
    fontSize: "3rem",
    height: SVG_HEIGHT,
    width: "350px",
  }),
);

const textStyle = css({
  fill: "rgba(231, 197, 73, 1)",
  paintOrder: "stroke",
  stroke: "rgba(145, 107, 51, 1)",
  strokeLinejoin: "round",
  strokeWidth: "15px",
});

const textShadow = css({
  fill: "black",
  filter: "url(#shadow)",
  paintOrder: "stroke",
  stroke: "black",
  strokeLinejoin: "round",
  strokeWidth: "15px",
});

const textEmboss = css({
  fill: "rgba(231, 197, 73, 0.5)",
  filter: "url(#emboss)",
});

export default function AnimalCrossingLogo({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 350 70" style={style} className={svg}>
      <defs>
        <filter id="emboss">
          <feConvolveMatrix
            kernelMatrix="3 0 0
                          0 0 0
                          0 0 -3"
          />
        </filter>
        <filter id="shadow">
          <feConvolveMatrix
            kernelMatrix="-3 0 0
                        0 0 0
                        0 0 3"
          />
        </filter>
      </defs>
      <text className={textStyle} x="16" y="45">
        {text}
      </text>
      <text aria-hidden className={textShadow} x="16" y="45">
        {text}
      </text>
      <text aria-hidden className={textEmboss} x="16" y="45">
        {text}
      </text>
    </svg>
  );
}
