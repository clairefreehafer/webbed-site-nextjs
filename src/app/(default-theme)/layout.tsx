import "@/sass/global.scss";
import "@/sass/default/style.scss";

import Stars from "@/components/stars";
import {
  atkinsonHyperlegibleMono,
  atkinsonHyperlegibleNext,
  caveat,
  garamond,
  redactedScript,
} from "@/fonts/default";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html
      className={`${atkinsonHyperlegibleNext.variable} ${atkinsonHyperlegibleMono.variable} ${garamond.variable} ${caveat.variable} ${redactedScript.variable}`}
    >
      <body>
        <Stars />

        {children}
      </body>
    </html>
  );
}
