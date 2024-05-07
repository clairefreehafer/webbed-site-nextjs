import { SVG_HEIGHT } from "@components/animal-crossing/logo";
import { fullScreen } from "@styles/layout";
import { GRASS_COLORS, GrassShape, getAstrologyDateRange, getGrassDateRange } from "@utils/animal-crossing";
import styled, { css } from "styled-components";

const UI_BACKGROUND_COLOR = "rgb(248, 245, 223, 0.8)";
const UI_BORDER_RADIUS = "3rem";
const UI_BOX_SHADOW = "0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)";

const grassDateRange = getGrassDateRange();
const astrologyDateRange = getAstrologyDateRange();

export const animalCrossingTheme = {
  name: "animal-crossing",
  grassDateRange,
  astrologyDateRange,
  shape: "square",
};

export const textBackground = css`
  backdrop-filter: blur(3px);
  background-color: ${UI_BACKGROUND_COLOR};
  border-radius: ${UI_BORDER_RADIUS};
  box-shadow: ${UI_BOX_SHADOW};
  color: black;
  font-weight: 200;
`;

export function grassBackground(shape: GrassShape, date = new Date()) {
  const dateRange = getGrassDateRange(date);
  return css`
    background-color: ${GRASS_COLORS[grassDateRange]};
    background-image: url(/images/animal-crossing/grass/${shape}_${dateRange}.png);
  `;
}

export const AnimalCrossingThemeRoot = styled.div<{ $shape?: string; $date?: Date }>`
  ${fullScreen};
  ${({ theme, $shape, $date }) => grassBackground($shape || theme.shape, $date || new Date())};
  background-position: left calc(50% - 128px) top calc(6rem + ${SVG_HEIGHT});
`;
