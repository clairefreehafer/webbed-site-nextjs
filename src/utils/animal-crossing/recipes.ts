import {
  RecipeConfig,
  RecipeDefinition,
  RecipeVariantRecord,
} from "@panda/types";
import { GRASS_COLORS, GRASS_SHAPES } from "@utils/animal-crossing/types";
import { GrassDateRange } from "./types";
import { cva } from "@panda/css";

// unfortunately we cannot simply place this within cva()
const generateVariants = (
  type: "grass" | "sand",
): Partial<RecipeConfig<RecipeVariantRecord>> => {
  const obj: RecipeDefinition = {
    variants: {
      grassDateRange: {},
      grassShape: {},
    },
    compoundVariants: [],
  };

  if (!obj.variants || !obj.compoundVariants) return {};

  for (let dateRange in GRASS_COLORS) {
    if (type === "grass") {
      obj.variants.grassDateRange[dateRange] = {
        bgColor: GRASS_COLORS[dateRange as GrassDateRange],
      };
    } else {
      obj.variants.grassDateRange[dateRange] = {};
    }

    for (let shape of GRASS_SHAPES) {
      obj.variants.grassShape[shape] = {};

      obj.compoundVariants.push({
        grassDateRange: dateRange,
        grassShape: shape,
        css: {
          bgImage: `url(/images/animal-crossing/${type}/${shape}_${dateRange}.png)`,
        },
      });
    }
  }

  console.log(JSON.stringify(obj));
  return obj;
};

// this cannot be a config recipe because we are dynamically choosing a variant using
// JS variables, so we need all of the utility classes to be generated.
export const grass = cva({
  base: {
    // top: SiteContainer padding + svg height + nav height + SiteContainer gap
    bgPosition: `left calc(50% - 128px) top calc(1rem + 70px + 4rem + 1rem)`,
  },
  variants: {
    grassDateRange: {
      "1210-0224": { bgColor: "rgb(189, 215, 238)" },
      "0225-0331": { bgColor: "rgb(31, 140, 57)" },
      "0401-0722": { bgColor: "rgb(0, 131, 90)" },
      "0723-0915": { bgColor: "rgb(19, 115, 82)" },
      "0916-0930": { bgColor: "rgb(73, 123, 49)" },
      "1001-1015": { bgColor: "rgb(132, 123, 58)" },
      "1016-1029": { bgColor: "rgb(148, 99, 99)" },
      "1030-1112": { bgColor: "rgb(148, 90, 98)" },
      "1113-1128": { bgColor: "rgb(132, 90, 82)" },
      "1129-1209": { bgColor: "rgb(99, 81, 82)" },
    },
    // for typing
    grassShape: { circle: {}, square: {}, triangle: {} },
  },
  compoundVariants: [
    {
      grassDateRange: "1210-0224",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_1210-0224.png)",
      },
    },
    {
      grassDateRange: "1210-0224",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_1210-0224.png)",
      },
    },
    {
      grassDateRange: "1210-0224",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_1210-0224.png)",
      },
    },
    {
      grassDateRange: "0225-0331",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_0225-0331.png)",
      },
    },
    {
      grassDateRange: "0225-0331",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_0225-0331.png)",
      },
    },
    {
      grassDateRange: "0225-0331",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_0225-0331.png)",
      },
    },
    {
      grassDateRange: "0401-0722",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_0401-0722.png)",
      },
    },
    {
      grassDateRange: "0401-0722",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_0401-0722.png)",
      },
    },
    {
      grassDateRange: "0401-0722",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_0401-0722.png)",
      },
    },
    {
      grassDateRange: "0723-0915",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_0723-0915.png)",
      },
    },
    {
      grassDateRange: "0723-0915",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_0723-0915.png)",
      },
    },
    {
      grassDateRange: "0723-0915",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_0723-0915.png)",
      },
    },
    {
      grassDateRange: "0916-0930",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_0916-0930.png)",
      },
    },
    {
      grassDateRange: "0916-0930",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_0916-0930.png)",
      },
    },
    {
      grassDateRange: "0916-0930",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_0916-0930.png)",
      },
    },
    {
      grassDateRange: "1001-1015",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_1001-1015.png)",
      },
    },
    {
      grassDateRange: "1001-1015",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_1001-1015.png)",
      },
    },
    {
      grassDateRange: "1001-1015",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_1001-1015.png)",
      },
    },
    {
      grassDateRange: "1016-1029",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_1016-1029.png)",
      },
    },
    {
      grassDateRange: "1016-1029",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_1016-1029.png)",
      },
    },
    {
      grassDateRange: "1016-1029",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_1016-1029.png)",
      },
    },
    {
      grassDateRange: "1030-1112",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_1030-1112.png)",
      },
    },
    {
      grassDateRange: "1030-1112",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_1030-1112.png)",
      },
    },
    {
      grassDateRange: "1030-1112",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_1030-1112.png)",
      },
    },
    {
      grassDateRange: "1113-1128",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_1113-1128.png)",
      },
    },
    {
      grassDateRange: "1113-1128",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_1113-1128.png)",
      },
    },
    {
      grassDateRange: "1113-1128",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_1113-1128.png)",
      },
    },
    {
      grassDateRange: "1129-1209",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/circle_1129-1209.png)",
      },
    },
    {
      grassDateRange: "1129-1209",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/grass/square_1129-1209.png)",
      },
    },
    {
      grassDateRange: "1129-1209",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/grass/triangle_1129-1209.png)",
      },
    },
  ],
});

generateVariants("sand");

export const sand = cva({
  base: {
    bgColor: "sand",
  },
  variants: {
    grassDateRange: {
      "1210-0224": {},
      "0225-0331": {},
      "0401-0722": {},
      "0723-0915": {},
      "0916-0930": {},
      "1001-1015": {},
      "1016-1029": {},
      "1030-1112": {},
      "1113-1128": {},
      "1129-1209": {},
    },
    grassShape: { circle: {}, square: {}, triangle: {} },
  },
  compoundVariants: [
    {
      grassDateRange: "1210-0224",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_1210-0224.png)",
      },
    },
    {
      grassDateRange: "1210-0224",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_1210-0224.png)",
      },
    },
    {
      grassDateRange: "1210-0224",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_1210-0224.png)",
      },
    },
    {
      grassDateRange: "0225-0331",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_0225-0331.png)",
      },
    },
    {
      grassDateRange: "0225-0331",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_0225-0331.png)",
      },
    },
    {
      grassDateRange: "0225-0331",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_0225-0331.png)",
      },
    },
    {
      grassDateRange: "0401-0722",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_0401-0722.png)",
      },
    },
    {
      grassDateRange: "0401-0722",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_0401-0722.png)",
      },
    },
    {
      grassDateRange: "0401-0722",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_0401-0722.png)",
      },
    },
    {
      grassDateRange: "0723-0915",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_0723-0915.png)",
      },
    },
    {
      grassDateRange: "0723-0915",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_0723-0915.png)",
      },
    },
    {
      grassDateRange: "0723-0915",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_0723-0915.png)",
      },
    },
    {
      grassDateRange: "0916-0930",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_0916-0930.png)",
      },
    },
    {
      grassDateRange: "0916-0930",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_0916-0930.png)",
      },
    },
    {
      grassDateRange: "0916-0930",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_0916-0930.png)",
      },
    },
    {
      grassDateRange: "1001-1015",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_1001-1015.png)",
      },
    },
    {
      grassDateRange: "1001-1015",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_1001-1015.png)",
      },
    },
    {
      grassDateRange: "1001-1015",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_1001-1015.png)",
      },
    },
    {
      grassDateRange: "1016-1029",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_1016-1029.png)",
      },
    },
    {
      grassDateRange: "1016-1029",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_1016-1029.png)",
      },
    },
    {
      grassDateRange: "1016-1029",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_1016-1029.png)",
      },
    },
    {
      grassDateRange: "1030-1112",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_1030-1112.png)",
      },
    },
    {
      grassDateRange: "1030-1112",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_1030-1112.png)",
      },
    },
    {
      grassDateRange: "1030-1112",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_1030-1112.png)",
      },
    },
    {
      grassDateRange: "1113-1128",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_1113-1128.png)",
      },
    },
    {
      grassDateRange: "1113-1128",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_1113-1128.png)",
      },
    },
    {
      grassDateRange: "1113-1128",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_1113-1128.png)",
      },
    },
    {
      grassDateRange: "1129-1209",
      grassShape: "circle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/circle_1129-1209.png)",
      },
    },
    {
      grassDateRange: "1129-1209",
      grassShape: "square",
      css: {
        bgImage: "url(/images/animal-crossing/sand/square_1129-1209.png)",
      },
    },
    {
      grassDateRange: "1129-1209",
      grassShape: "triangle",
      css: {
        bgImage: "url(/images/animal-crossing/sand/triangle_1129-1209.png)",
      },
    },
  ],
});
