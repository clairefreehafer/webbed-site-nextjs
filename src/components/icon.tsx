"use client";

import { Album, Icon } from "@prisma/client";
import { Theme } from "@styles/theme";
import { getAstrologyDateRange } from "@utils/animal-crossing";
import Image from "next/image";

export type DisplayIconType = Pick<Icon, "imagePath" | "character">;

const imageStyles: Record<Theme, string> = {
  default: "",
  notebook: "",
  animalCrossing: "max-h-12 max-w-12 object-contain",
  zelda: "max-h-6 max-w-6 mr-2",
  admin: "",
};

type DisplayIconProps = {
  icon: DisplayIconType | null;
  /** for animal crossing links w/o an icon. */
  date?: Album["date"];
  theme?: Theme;
};

export default function DisplayIcon({
  icon,
  date,
  theme = "default",
}: DisplayIconProps) {
  if (!icon) {
    if (theme === "animalCrossing") {
      if (!date) {
        throw new Error("please pass a date for animal crossing page icons!");
      }
      const astrologyDateRange = getAstrologyDateRange(date);

      return (
        <img
          src={`/images/animal-crossing/star-fragments/star-fragment_${astrologyDateRange}.png`}
          alt=""
          className={imageStyles[theme]}
        />
      );
    }

    return null;
  }

  if (icon.imagePath) {
    return <img src={icon.imagePath} alt="" className={imageStyles[theme]} />;
  }

  if (icon.character) {
    return <p className="text-[3rem]">{icon.character}</p>;
  }

  return null;
}
