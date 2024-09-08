import { css } from "@panda/css";

const background = css({
  bgGradient: "rainbow",
});

type Props = {
  borderWidth: React.CSSProperties["borderWidth"];
  children: React.ReactNode;
};

export default function RainbowBorder({ borderWidth, children }: Props) {
  return (
    <div className={background} style={{ padding: borderWidth }}>
      {children}
    </div>
  );
}
