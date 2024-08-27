import { finkHeavy } from "@fonts/animal-crossing";
import { CSSProperties } from "react";

export const SVG_HEIGHT = "70px";

export default function AnimalCrossingLogo({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 350 70"
      style={style}
      className={`${finkHeavy.className} h-[70px] w-[350px] fill-[rgba(231,197,73,1)] text-5xl`}
    >
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
      <text
        className="fill-[rgba(231,197,73,1)] stroke-[rgba(145,107,51,1)] stroke-[15px]"
        style={{
          strokeLinejoin: "round",
          paintOrder: "stroke",
        }}
        x="16"
        y="45"
      >
        {text}
      </text>
      <text
        aria-hidden
        className="fill-black stroke-black stroke-[15px]"
        style={{
          filter: "url(#shadow)",
          strokeLinejoin: "round",
          paintOrder: "stroke",
        }}
        x="16"
        y="45"
      >
        {text}
      </text>
      <text
        aria-hidden
        className="fill-rgba(231,197,73,0.5)"
        style={{ filter: "url(#emboss)" }}
        x="16"
        y="45"
      >
        {text}
      </text>
    </svg>
  );
}
