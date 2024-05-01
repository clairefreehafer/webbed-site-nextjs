import styled from "styled-components";
import { fullScreen } from "@styles/layout";
import { rainbowBorder } from "@styles/mixins";

const DefaultTheme = styled.div<{ $borderWidth: string }>`
  ${fullScreen};
  ${({ $borderWidth }) => rainbowBorder($borderWidth)};
`;

export default function DefaultThemeRoot({
  borderWidth = "2px",
  children
}: {
  borderWidth?: string;
  children: Readonly<React.ReactNode>
}) {
  return (
    <DefaultTheme $borderWidth={borderWidth}>
      <div style={{ padding: "1rem" }}>
        {children}
      </div>
    </DefaultTheme>
  )
}