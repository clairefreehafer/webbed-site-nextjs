import { CSSProperties } from "react";
import { css } from "styled-components";
import localFont from "next/font/local";

const finkHeavy = localFont({
  src: [
    { path: "../../fonts/animal-crossing/fink-heavy.woff2" },
    { path: "../../fonts/animal-crossing/fink-heavy.woff" }
  ]
});

const SVG_HEIGHT = "70px";

const title = css`
  font-size: 3rem;
  width: 350px;
  height: ${SVG_HEIGHT};
  fill: rgba(231, 197, 73, 1);
`;

const background = css`
  fill: rgba(231, 197, 73, 1);
  stroke: rgba(145, 107, 51, 1);
  stroke-width: 15px;
  stroke-linejoin: round;
  paint-order: stroke;
`;

const backgroundShadow = css`
  fill: black;
  stroke: black;
  stroke-width: 15px;
  stroke-linejoin: round;
  paint-order: stroke;
`;

const emboss = css`
  fill: rgba(231, 197, 73, 0.5);
`;

export default function AnimalCrossingLogo({
  text,
  style
}: {
  text: string,
  style?: CSSProperties
 }) {
  return (
    <svg css={title} viewBox="0 0 350 70" style={style} className={finkHeavy.className}>
      <defs>
        <filter id="emboss">
          <feConvolveMatrix
            kernelMatrix="3 0 0
                          0 0 0
                          0 0 -3" />
        </filter>
        <filter id="shadow">
          <feConvolveMatrix
          kernelMatrix="-3 0 0
                        0 0 0
                        0 0 3" />
        </filter>
      </defs>
      <text
        css={background}
        x="16"
        y="45"
      >
        {text}
      </text>
      <text
        aria-hidden
        css={backgroundShadow}
        style={{ filter: "url(#shadow)" }}
        x="16"
        y="45"
      >
        {text}
      </text>
      <text
        aria-hidden
        css={emboss}
        style={{ filter: "url(#emboss)" }}
        x="16"
        y="45"
      >
        {text}
      </text>
    </svg>
  )
}