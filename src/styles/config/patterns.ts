import { definePattern } from "@pandacss/dev";

const jaggedBorder = definePattern({
  description: "https://codepen.io/HollowMan/pen/wvyymz",
  properties: {
    jagSize: { type: "number" },
    side: { type: "enum", value: ["top", "bottom"] },
  },
  defaultValues: {
    jagSize: 20,
  },
  // use margins on children or else things get funky.
  blocklist: ["paddingLeft", "paddingRight", "px"],
  transform(props) {
    const { side, jagSize, ...rest } = props;

    return {
      background: "#FFFFFF",
      position: "relative",
      marginTop: side === "top" ? jagSize : "unset",
      marginBottom: side === "bottom" ? jagSize : "unset",
      _before:
        side === "top"
          ? {
              background: "{gradients.jaggedBorder.whiteTop}",
              backgroundSize: `${jagSize}px ${jagSize * 2}px`,
              content: '""',
              height: jagSize / 2,
              position: "absolute",
              top: -(jagSize / 2),
              width: "100%",
            }
          : {},
      _after:
        side === "bottom"
          ? {
              background: "{gradients.jaggedBorder.whiteBottom}",
              backgroundSize: `${jagSize}px ${jagSize * 2}px`,
              content: '""',
              height: jagSize,
              position: "absolute",
              bottom: -(jagSize / 2),
              width: "100%",
            }
          : {},
      ...rest,
    };
  },
});

const scanLines = definePattern({
  description: "https://css-tricks.com/old-timey-terminal-styling/",
  transform(props) {
    return {
      _after: {
        bg: "{gradients.scanLines}",
        content: '""',
        height: "100vh",
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        width: "100vw",
      },
      ...props,
    };
  },
});

const patterns = {
  jaggedBorder,
  scanLines,
};

export default patterns;
