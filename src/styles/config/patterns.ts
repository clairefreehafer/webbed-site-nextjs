import { definePattern } from "@pandacss/dev";

const analglyphText = definePattern({
  properties: {
    shadowOffset: { type: "string" },
  },
  transform(props) {
    const { shadowOffset } = props;

    return {
      color: "{colors.analglyph.black}",
      position: "relative",
      textShadow: `-${shadowOffset} 0 0 {colors.analglyph.red}, ${shadowOffset} 0 0 {colors.analglyph.blue}`,
      ...props,
    };
  },
});

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
              left: 0,
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
              left: 0,
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

const siteContainer = definePattern({
  description:
    "for limiting the site conents to a specific max width, and centering on larger screens.",
  properties: {
    maxWidth: { type: "property", value: "maxWidth" },
  },
  defaultValues: {
    // TODO: token
    maxWidth: 750,
  },
  transform(props) {
    return {
      alignItems: "center",
      display: "flex",
      flexDir: "column",
      gap: "1rem",
      margin: "0 auto",
      p: "1rem",
      width: "100%",
      ...props,
    };
  },
});

const patterns = {
  analglyphText,
  jaggedBorder,
  scanLines,
  siteContainer,
};

export default patterns;
