import type { CSSProp } from "styled-components";
// import Theme from './theme';

// type ThemeType = typeof Theme;

// TODO: type this
// declare module "styled-components" {
//   export interface DefaultTheme extends ThemeType {}
// }

declare module "react" {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}