import { css } from "@panda/css";

const header = css({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function Header({ children }: { children: React.ReactNode }) {
  return <header className={header}>{children}</header>;
}
