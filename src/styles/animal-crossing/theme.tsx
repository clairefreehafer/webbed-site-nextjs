import { getGrassDateRange } from "@utils/animal-crossing";
import { ReactNode } from "react";
import { fotSeuratProB } from "@fonts/animal-crossing";
import { GrassDateRange, GrassShape } from "@utils/animal-crossing/types";
import { css, cx } from "@panda/css";
import { fullScreen } from "@utils/layout";
import { animalCrossingGrassRecipe } from "@utils/animal-crossing/recipes";

const themeRoot = (grassShape: GrassShape, grassDateRange: GrassDateRange) =>
  cx(
    animalCrossingGrassRecipe({ grassShape, grassDateRange }),
    css(fullScreen),
    css({}),
    fotSeuratProB.className,
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
