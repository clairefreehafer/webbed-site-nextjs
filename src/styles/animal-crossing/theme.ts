import { getDateRange } from "@utils/animal-crossing";
import { css } from "styled-components";

const UI_BACKGROUND_COLOR = "rgb(248, 245, 223, 0.8)";
const UI_BORDER_RADIUS = "3rem";
const UI_BOX_SHADOW = "0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5)";

export const animalCrossingTheme = {
  name: "animal-crossing",
  dateRange: getDateRange(),
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