import { defineLayerStyles } from "@pandacss/dev";

const layerStyles = defineLayerStyles({
  acnhTextBackground: {
    description: "ACNH-style dialogue bubble background",
    value: {
      backgroundColor: "rgb(248, 245, 223, 0.8)",
      borderRadius: "3rem",
      boxShadow: "0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)",
    },
  },
});

export default layerStyles;
