import {
  RecipeConfig,
  RecipeDefinition,
  RecipeVariantRecord,
} from "@panda/types";
import { GRASS_COLORS, GRASS_SHAPES } from "@utils/animal-crossing/types";
import { GrassDateRange } from "./types";
import { cva } from "@panda/css";

const generateVariants = (): Partial<RecipeConfig<RecipeVariantRecord>> => {
  const obj: RecipeDefinition = {
    variants: {
      grassDateRange: {},
      grassShape: {},
    },
    compoundVariants: [],
  };

  if (!obj.variants || !obj.compoundVariants) return {};

  for (let dateRange in GRASS_COLORS) {
    obj.variants.grassDateRange[dateRange] = {
      bgColor: GRASS_COLORS[dateRange as GrassDateRange],
    };

    for (let shape of GRASS_SHAPES) {
      obj.variants.grassShape[shape] = {};

      obj.compoundVariants.push({
        grassDateRange: dateRange,
        grassShape: shape,
        css: {
          bgImage: `url(/images/animal-crossing/grass/${shape}_${dateRange}.png)`,
        },
      });
    }
  }

  return obj;
};

// this cannot be a config recipe because we are dynamically choosing a variant using
// JS variables, so we need all of the utility classes to be generated.
export const animalCrossingGrassRecipe = cva({
  base: {
    bgPosition: "left calc(50%-128px) top calc(7rem+70px)]",
  },
  ...generateVariants(),
});
