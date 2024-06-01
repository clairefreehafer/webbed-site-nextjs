import { SVG_HEIGHT } from "@components/animal-crossing/logo";
import { fullScreen } from "@styles/layout";
import {
  GRASS_COLORS,
  GrassDateRange,
  GrassShape,
  getAstrologyDateRange,
  getGrassDateRange,
} from "@utils/animal-crossing";
import { ReactNode } from "react";
import { fotSeuratProB } from "@fonts/animal-crossing";

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
  iconHeight: 2,
};

type Props = {
  shape?: GrassShape;
  date?: Date;
  children: ReactNode;
};

const backgroundColor: Record<GrassDateRange, string> = {
  "1210-0224": "bg-grass-color-1210-0224",
  "0225-0331": "bg-grass-color-0225-0331",
  "0401-0722": "bg-grass-color-0401-0722",
  "0723-0915": "bg-grass-color-0723-0915",
  "0916-0930": "bg-grass-color-0916-0930",
  "1001-1015": "bg-grass-color-1001-1015",
  "1016-1029": "bg-grass-color-1016-1029",
  "1030-1112": "bg-grass-color-1030-1112",
  "1113-1128": "bg-grass-color-1113-1128",
  "1129-1209": "bg-grass-color-1129-1209",
};

export default function AnimalCrossingThemeRoot({
  shape,
  date = new Date(),
  children,
}: Props) {
  const grassDateRange = getGrassDateRange(date);
  return (
    <div
      className={`${backgroundColor[grassDateRange]} ${fotSeuratProB.className} h-screen w-screen bg-[left_calc(50%-128px)_top_calc(6rem+70px)] text-black`}
      style={{
        backgroundImage: `url(/images/animal-crossing/grass/${shape}_${grassDateRange}.png)`,
      }}
    >
      {children}
    </div>
  );
}
