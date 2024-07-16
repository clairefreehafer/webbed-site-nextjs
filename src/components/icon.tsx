"use client";

import { Album, Icon } from "@prisma/client";
import { Theme, ThemeStyles } from "@styles/theme";
import { getAstrologyDateRange } from "@utils/animal-crossing";

export type DisplayIconType = Pick<Icon, "imagePath" | "character" | "text">;

const imageStyles: ThemeStyles = {
  animalCrossing: "max-h-12 max-w-12 object-contain drop-shadow-text",
  zelda: "max-h-6 max-w-6 mr-2",
  admin: "max-h-12 max-w-12 mx-auto",
};

const emojiStyles: ThemeStyles = {
  notebook: "mr-2 text-2xl",
  admin: "text-4xl",
};

type DisplayIconProps = {
  icon: DisplayIconType | null;
  /** for animal crossing links w/o an icon. */
  date?: Album["date"];
  theme?: Theme;
};

// TODO: add hover title
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
      const { name, dateRange } = getAstrologyDateRange(date);

      return (
        <img
          src={`/images/animal-crossing/star-fragments/star-fragment_${dateRange}.png`}
          alt=""
          className={imageStyles[theme]}
          title={`${name} star fragment`}
        />
      );
    }

    throw new Error("missing icon data.");
  }

  if (icon.imagePath) {
    return (
      <img
        src={icon.imagePath}
        alt=""
        className={imageStyles[theme]}
        title={icon.text || undefined}
      />
    );
  }

  if (icon.character) {
    return (
      <p className={`${emojiStyles[theme]} [text-shadow:none]`}>
        {icon.character}
      </p>
    );
  }

  return null;
}
