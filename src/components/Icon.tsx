import { cva } from "@panda/css";
import { Album, Icon } from "@prisma/client";
import { getAstrologyDateRange } from "@utils/animal-crossing";

export type DisplayIconType = Pick<Icon, "imagePath" | "character" | "text">;

const imageIcon = cva({
  variants: {
    theme: {
      admin: {
        maxHeight: "3rem",
      },
      animalCrossing: {
        maxHeight: "3rem",
        filter: "drop-shadow({shadows.text})",
      },
      zelda: {
        maxHeight: "1.5rem",
      },
    },
    display: {
      inline: {
        marginRight: "0.5rem",
      },
      solo: {},
    },
  },
});

const emojiIcon = cva({
  base: {
    textShadow: "none",
  },
  variants: {
    theme: {
      admin: {
        fontSize: "2rem",
      },
      notebook: {
        marginRight: "0.5rem",
        fontSize: "1.5rem",
      },
    },
  },
});

export type DisplayIconProps = {
  icon: DisplayIconType | null;
  /** for animal crossing links w/o an icon. */
  date?: Album["date"];
  display: "inline" | "solo";
  theme?:
    | (typeof imageIcon.variantMap.theme)[number]
    | (typeof emojiIcon.variantMap.theme)[number];
};

// TODO: add hover title
export default function DisplayIcon({
  icon,
  date,
  theme,
  display,
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
          className={imageIcon({ theme, display })}
          title={`${name} star fragment`}
        />
      );
    }

    // TODO: change this to throw an error perhaps
    return null;
  }

  if (icon.imagePath) {
    if (theme === "notebook") {
      throw new Error("image icons should not be used in notebook theme.");
    }

    return (
      <img
        src={icon.imagePath}
        alt=""
        className={imageIcon({ theme, display })}
        title={icon.text || undefined}
      />
    );
  }

  if (icon.character) {
    if (theme === "animalCrossing" || theme === "zelda") {
      throw new Error("emoji icons should not be used in video game themes.");
    }

    return <p className={emojiIcon({ theme })}>{icon.character}</p>;
  }

  return null;
}
