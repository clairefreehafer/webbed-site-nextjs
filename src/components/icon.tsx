"use client";

import { Album, Icon } from "@prisma/client";
import { Theme } from "@styles/theme";
import { getAstrologyDateRange } from "@utils/animal-crossing";
import styled from "styled-components";

const Emoji = styled.p<{ $height: number | "inherit"; $inline: boolean }>`
  ${({ $height }) =>
    $height === "inherit"
      ? "font-size: inherit;"
      : `font-size: ${$height - 1}rem;`}

  ${({ $inline }) => !$inline && "width: 100%;"}
`;

const Image = styled.img<{ $height: number | "inherit"; $inline: boolean }>`
  ${({ $height }) => `height: ${$height}rem; max-width: ${$height}rem;`}
  ${({ $inline }) => $inline && "margin-right: 0.25rem;"}
`;

export type DisplayIconType = Pick<Icon, "imagePath" | "character">;

type DisplayIconProps = {
  icon: DisplayIconType | null;
  /** rem. height of image, emoji will be this - 1. */
  height?: number | "inherit";
  inline?: boolean;
  /** for animal crossing links w/o an icon. */
  date?: Album["date"];
  theme?: Theme;
};

export default function DisplayIcon({
  icon,
  height = "inherit",
  inline = false,
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
        <Image
          src={`/images/animal-crossing/star-fragments/star-fragment_${astrologyDateRange}.png`}
          alt=""
          $height={height}
          $inline={inline}
        />
      );
    }

    return null;
  }

  if (icon.imagePath) {
    return (
      <Image src={icon.imagePath} alt="" $height={height} $inline={inline} />
    );
  }

  if (icon.character) {
    return (
      <Emoji $height={height} $inline={inline}>
        {icon.character}
        {inline && " "}
      </Emoji>
    );
  }

  return null;
}
