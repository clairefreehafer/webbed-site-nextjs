import { cache } from "react";
import { getSections } from "./prisma/section";

export enum AlbumTypes {
  Default = "default",
  Tag = "tag",
}

export enum AlbumSections {
  Photography = "photography",
  NewHorizonsEvents = "new-horizons/events",
  NewHorizonsResidents = "new-horizons/residents",
  NewHorizonsVisitors = "new-horizons/visitors",
  NewLeaf = "new leaf",
  TearsOfTheKingdom = "tears of the kingdom",
  BreathOfTheWild = "breath of the wild",
}

export function displayName(album: string) {
  if (album?.includes("-")) {
    return album.replaceAll("-", " ");
  }
  return album;
}

export function slugName(album: string) {
  if (album?.includes(" ")) {
    return album.replaceAll(" ", "-");
  }
  return album;
}

export const getSectionsArr = cache(
  async (section?: string): Promise<string[]> => {
    const sections = await getSections();

    return sections.map((obj) => obj.name).filter((item) => !!item.length);
  },
);
