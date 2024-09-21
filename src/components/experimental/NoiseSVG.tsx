import { SVGAttributes } from "react";
import * as ReactDOMServer from "react-dom/server";

// for using in CSS
// { backgroundImage: `url("data:image/svg+xml,${svgString}")` }
export function encodeNoiseSVG(props?: Props) {
  return encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(<NoiseSVG {...props} />)
  );
}

type Props = SVGAttributes<SVGFETurbulenceElement> & {
  /** pixels */
  size?: number;
};

// https://grainy-gradients.vercel.app/
export default function NoiseSVG({
  baseFrequency = 0.65,
  numOctaves = 3,
  size = 250,
}: Props) {
  return (
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
