import { css, cx } from "@panda/css";
import { fullScreen } from "@utils/layout";

const themeRoot = cx(
  css(fullScreen),
  css({
    bgImage: "url('/images/zelda/pad-background.jpg')",
    color: "white",
    width: "100%",
  })
);

export default function ZeldaThemeRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-panda-theme="zelda" className={themeRoot}>
      {children}
    </div>
  );
}
