import { css } from "@panda/css";

// TODO: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
export default function TV() {
  return (
    <div
      className={css({
        backgroundColor: "antiquewhite",
        aspectRatio: "4/3",
        maxWidth: "300px",
        padding: "30px",
      })}
    >
      <div
        className={css({
          position: "relative",
          aspectRatio: "4/3",
          background: "{gradients.radial}",
          borderRadius: "50% / 10%",
          color: "white",
          textAlign: "center",
          textIndent: ".1em",
          _before: {
            content: "''",
            position: "absolute",
            top: "10%",
            bottom: "10%",
            right: "-5%",
            left: "-5%",
            background: "inherit",
            borderRadius: "5% / 50%",
          },
        })}
      ></div>
    </div>
  );
}
