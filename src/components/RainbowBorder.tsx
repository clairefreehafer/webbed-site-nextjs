import { css } from "@panda/css";

const background = css({
  bgGradient: "rainbow",
});

type Props = {
  borderWidth: React.CSSProperties["borderWidth"];
  children: React.ReactNode;
  className?: string;
};

export default function RainbowBorder({
  borderWidth,
  children,
  className,
}: Props) {
  return (
    <div
      className={`${background} ${className}`}
      style={{ padding: borderWidth }}
    >
      {children}
    </div>
  );
}
