import { getGrassDateRange } from "@utils/animal-crossing";
import { ReactNode } from "react";
import { fotSeuratProB } from "@fonts/animal-crossing";
import { GrassDateRange, GrassShape } from "@utils/animal-crossing/types";

// keepin around for reference & in case we ever move away from tailwind.
// export const GRASS_COLORS: Record<GrassDateRange, string> = {
//   "1210-0224": "rgb(189, 215, 238)",
//   "0225-0331": "rgb(31, 140, 57)",
//   "0401-0722": "rgb(0, 131, 90)",
//   "0723-0915": "rgb(19, 115, 82)",
//   "0916-0930": "rgb(73, 123, 49)",
//   "1001-1015": "rgb(132, 123, 58)",
//   "1016-1029": "rgb(148, 99, 99)",
//   "1030-1112": "rgb(148, 90, 98)",
//   "1113-1128": "rgb(132, 90, 82)",
//   "1129-1209": "rgb(99, 81, 82)",
// };

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

type Props = {
  shape: GrassShape;
  date?: Date;
  children: ReactNode;
};

export default function AnimalCrossingThemeRoot({
  shape,
  date = new Date(),
  children,
}: Props) {
  const grassDateRange = getGrassDateRange(date);
  return (
    <div
      className={`${backgroundColor[grassDateRange]} ${fotSeuratProB.className} min-w-screen h-full min-h-screen bg-[left_calc(50%-128px)_top_calc(7rem+70px)] py-4 text-black`}
      style={{
        backgroundImage: `url(/images/animal-crossing/grass/${shape}_${grassDateRange}.png)`,
      }}
    >
      {children}
    </div>
  );
}
