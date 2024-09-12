import { getGrassDateRange } from "@utils/animalCrossing";
import { ReactNode } from "react";
import { fotSeuratProB } from "@fonts/animal-crossing";
import { GrassDateRange, GrassShape } from "types/animalCrossing";
import { css, cx } from "@panda/css";
import { fullScreen } from "@styles/layout";
import { grass } from "@styles/animalCrossing";

const themeRoot = (grassShape: GrassShape, grassDateRange: GrassDateRange) =>
  cx(
    grass({ grassShape, grassDateRange }),
    css(fullScreen),
    css({}),
    fotSeuratProB.className
  );

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
      className={themeRoot(shape, grassDateRange)}
      data-panda-theme="animalCrossing"
    >
      {children}
    </div>
  );
}
