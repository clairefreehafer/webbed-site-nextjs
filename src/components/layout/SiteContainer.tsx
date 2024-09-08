import { css } from "@panda/css";

type Props = {
  maxWidth?: React.CSSProperties["maxWidth"];
  children: React.ReactNode;
};

const siteContainer = css({
  alignItems: "center",
  display: "flex",
  flexDir: "column",
  margin: "auto",
});

/** Component for limiting the site conents to a specific max width,
 * and centering on larger screens.
 */
export default function SiteContainer({ maxWidth = 750, children }: Props) {
  return (
    <div className={siteContainer} style={{ maxWidth }}>
      {children}
    </div>
  );
}
