"use client";

import { fullScreen } from "@styles/layout";
import { DateRange, GrassShape, getDateRange, grassColors } from "@utils/animal-crossing";
import styled from "styled-components";


const ThemeRoot = styled.div<{ shape: GrassShape, dateRange: DateRange; }>`
  ${fullScreen};
  background-color: ${({ dateRange }) => grassColors[dateRange]};
  background-image: url(${({ shape, dateRange }) => `/images/animal-crossing/grass/${shape}_${dateRange}.png`});
`;

export default function AnimalCrossingLayout({ children }: { children: Readonly<React.ReactNode> }) {
  const dateRange = getDateRange();
  return (
    <ThemeRoot shape={"square"} dateRange={dateRange}>
      test
    </ThemeRoot>
  )
}