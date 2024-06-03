import plugin from "tailwindcss/plugin";

export default plugin(
  function () {
    return {};
  },
  {
    theme: {
      extend: {
        spacing: {
          "site-width": "750px",
        },
        zIndex: {
          "slideshow-ui": "2",
          "slideshow-inset-shadow": "1",
          "slideshow-photo": "0",
          "slideshow-border-texture": "-1",
          "slideshow-border": "-2",
        },
      },
    },
  },
);
