import { ThemeName } from "@panda/themes";
import { useEffect, useState } from "react";

export function useTheme(): ThemeName | undefined {
  const [theme, setTheme] = useState<ThemeName>();

  useEffect(() => {
    if (!document) {
      console.error("cannot get theme on the server.");
    } else {
      const element = document.querySelector("[data-panda-theme]");

      if (!element) {
        console.warn("no theme set.");
      } else {
        setTheme(element.getAttribute("data-panda-theme") as ThemeName);
      }
    }
  }, []);

  return theme;
}
