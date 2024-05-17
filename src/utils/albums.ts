import { PrismaClient } from "@prisma/client";
import { cache } from "react";

export enum AlbumTypes {
  Default = "default",
  Tag = "tag"
}

export enum AlbumSections {
  Photography = "photography",
  NewHorizonsEvents = "new-horizons/events",
  NewHorizonsResidents = "new-horizons/residents",
  NewHorizonsVisitors = "new-horizons/visitors",
  NewLeaf = "new leaf",
  TearsOfTheKingdom = "tears of the kingdom",
  BreathOfTheWild = "breath of the wild"
};

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

const prisma = new PrismaClient();

export const getAlbums = cache(async (section: string[]) => {
  const albums = await prisma.album.findMany({
    where: { section: { hasEvery: section }},
    include: { coverPhoto: true }
  });

  return albums;
});

export const getSections = cache(
  async (section?: string): Promise<string[][]> => {
    const sections = await prisma.album.findMany({
      distinct: "section",
      select: {
        section: true
      },
      ...(section && {
        where: {
          section: { has: section }
        }
      })
    });

    return sections.map((obj) => (
      obj.section
    )).filter((item) => !!item.length);
  }
);
