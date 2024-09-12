import { cva } from "@panda/css";
import { whiteToBlue } from "@styles/zelda";

const pageBorder = cva({
  base: {
    ...whiteToBlue,
    left: "0",
    position: "absolute",
    width: "100%",
  },
  variants: {
    position: {
      top: {
        top: 0,
        transform: "rotate(180deg)",
      },
      bottom: {
        bottom: 0,
      },
    },
  },
});

type Props = {
  position: (typeof pageBorder.variantMap.position)[number];
};

export default function PageBorder({ position }: Props) {
  return (
    <>
      <img
        src="/images/zelda/pad-frame_glow.png"
        alt=""
        className={pageBorder({ position })}
      />
      <img
        src="/images/zelda/pad-frame.png"
        alt=""
        className={pageBorder({ position })}
      />
    </>
  );
}
