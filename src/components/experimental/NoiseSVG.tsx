import { SVGAttributes } from "react";
import * as ReactDOMServer from "react-dom/server";

// for using in CSS
// { backgroundImage: `url("data:image/svg+xml,${svgString}")` }
export function encodeNoiseSVG(props?: NoiseSVGProps) {
  return encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(<NoiseSVG {...props} />)
  );
}

export type NoiseSVGProps = Pick<
  SVGAttributes<SVGFETurbulenceElement>,
  "baseFrequency" | "numOctaves"
> & {
  /** pixels */
  size?: number;
};

// https://grainy-gradients.vercel.app/
export default function NoiseSVG({
  baseFrequency = 0.65,
  numOctaves = 3,
  size = 250,
}: NoiseSVGProps) {
  return (
    // TODO: test rectangular size?
    <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={numOctaves}
          stitchTiles="stitch"
        />
      </filter>

      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
