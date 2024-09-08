import { css } from "@panda/css";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const fillParent = css({
  height: "100%",
  width: "100%",
});

export default function FillParent({ children, style }: Props) {
  return (
    <div className={fillParent} style={style}>
      {children}
    </div>
  );
}
