import { adminTheme } from "@styles/admin/theme";
import { animalCrossingTheme } from "@styles/animal-crossing/theme";
import { photographyTheme } from "@styles/photography/theme";
import { zeldaTheme } from "@styles/zelda/theme";
import type { CSSProp } from "styled-components";

type Themes = typeof animalCrossingTheme | typeof photographyTheme | typeof zeldaTheme | typeof adminTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Themes {}
}

declare module "react" {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}