import { cva } from "@panda/css";
import { ThemeName } from "@panda/themes";

const wiggleBox = cva({
  base: {
    borderColor: "white",
    borderWidth: "4px 3px 5px 3px",
    height: "100%",
    opacity: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    _groupHover: {
      animation: "wiggleBox",
    },
  },
  variants: {
    number: {
      "1": {
        borderRadius: "95px 14px 92px 15px / 14px 95px 16px 95px",
      },
      "2": {
        borderRadius: "14px 92px 15px 95px / 95px 16px 95px 14px",
        _groupHover: { animationDelay: "calc(token(durations.wiggleBox) / 3)" },
      },
      "3": {
        borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
        _groupHover: {
          animationDelay: "calc(2 * token(durations.wiggleBox) / 3)",
        },
      },
    },
  },
});

export default function WiggleBox({ theme }: { theme?: ThemeName }) {
  if (theme !== "notebook") {
    return null;
  }

  return (
    <>
      <div className={wiggleBox({ number: "1" })} />
      <div className={wiggleBox({ number: "2" })} />
      <div className={wiggleBox({ number: "3" })} />
    </>
  );
}
