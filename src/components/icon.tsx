"use client";

import { Album, Icon } from "@prisma/client";
import { Theme } from "@styles/theme";
import { getAstrologyDateRange } from "@utils/animal-crossing";
import Image from "next/image";

export type DisplayIconType = Pick<Icon, "imagePath" | "character">;

type DisplayIconProps = {
  icon: DisplayIconType | null;
  /** rem. height of image, emoji will be this - 1. */
  height?: number | "inherit";
  inline?: boolean;
  /** for animal crossing links w/o an icon. */
  date?: Album["date"];
  theme?: Theme;
  className?: string;
};

export default function DisplayIcon({
  icon,
  height = "inherit",
  inline = false,
  date,
  theme = "default",
  className = "",
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
          className={className}
        />
      );
    }

    return null;
  }

  if (icon.imagePath) {
    return <img src={icon.imagePath} alt="" className={className} />;
  }

  if (icon.character) {
    return (
      <p className="text-[3rem]">
        {icon.character}
        {inline && " "}
      </p>
    );
  }

  return null;
}
