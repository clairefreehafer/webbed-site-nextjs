import { css } from "@panda/css";

const fullScreen = css({
  display: "flex",
  minHeight: "100vh",
  "& > *": {
    width: "100%",
  },
});

export default function FullScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={fullScreen}>{children}</div>;
}
