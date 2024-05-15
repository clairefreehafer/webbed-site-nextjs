import { Album, Photo, PrismaClient } from "@prisma/client";
import { cache } from "react";

export type GrassShape = "circle" | "square" | "triangle";

export type GrassDateRange =
  "1210-0224" |
  "0225-0331" |
  "0401-0722" |
  "0723-0915" |
  "0916-0930" |
  "1001-1015" |
  "1016-1029" |
  "1030-1112" |
  "1113-1128" |
  "1129-1209";

export const GRASS_COLORS: Record<GrassDateRange, string> = {
  "1210-0224": "rgb(189, 215, 238)",
  "0225-0331": "rgb(31, 140, 57)",
  "0401-0722": "rgb(0, 131, 90)",
  "0723-0915": "rgb(19, 115, 82)",
  "0916-0930": "rgb(73, 123, 49)",
  "1001-1015": "rgb(132, 123, 58)",
  "1016-1029": "rgb(148, 99, 99)",
  "1030-1112": "rgb(148, 90, 98)",
  "1113-1128": "rgb(132, 90, 82)",
  "1129-1209": "rgb(99, 81, 82)",
};

enum AstrologyDateRange {
  capricorn = "1222-0119",
  aquarius = "0120-0218",
  pisces = "0219-0320",
  aries = "0321-0419",
  taurus = "0420-0520",
  gemini = "0521-0621",
  cancer = "0622-0722",
  leo = "0723-0822",
  virgo = "0823-0922",
  libra = "0923-1023",
  scorpio = "1024-1122",
  sagittarius = "1123-1221"
};

const prisma = new PrismaClient();

// TODO: find a better way to handle this.
const tagAlbumNameMapping: Record<string, string> = {
  "an old friend": "rover"
};

export const getAlbumPhotos = cache(async (albumName: string, section: string) => {
  // TODO: type this better
  let photos: (Partial<Photo> & { album?: Album | null })[] = [];

  const tags = await prisma.tag.findMany({
    where: { parent: "animal crossing" },
    select: { tag: true }
  });

  const flattenedTags = tags.map((tag) => tag.tag)

  if (flattenedTags.includes(albumName)) {
    photos = await prisma.photo.findMany({
      include: { tags: true, album: true },
      where: { tags: { some: {
        tag: tagAlbumNameMapping[albumName] || albumName
      }}}},
    );
  } else {
    photos = await prisma.photo.findMany({
      where: {
        albumName,
      },
      orderBy: {
        captureDate: "asc"
      },
      select: {
        id: true,
        url: true,
        album: true,
      }
    });
  }

  return photos;
});

export function getGrassDateRange(date = new Date()): GrassDateRange {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (month) {
    case 1:
      return "1210-0224";
    case 2:
      return day <= 24 ? "1210-0224" : "0225-0331";
    case 3:
      return "0225-0331";
    case 4:
    case 5:
    case 6:
      return "0401-0722";
    case 7:
      return day <= 22 ? "0401-0722" : "0723-0915";
    case 8:
      return "0723-0915";
    case 9:
      return day <= 15 ? "0723-0915" : "0916-0930";
    case 10:
      if (day <= 15) {
        return "1001-1015";
      } else if (day <= 29) {
        return "1016-1029";
      }
      return "1030-1112";
    case 11:
      if (day <= 12) {
        return "1030-1112";
      } else if (day <= 28) {
        return "1113-1128";
      }
      return "1129-1209";
    case 12:
      return day <= 9 ? "1129-1209" : "1210-0224";
    default:
      console.error("month value out of bounds for grass date range.");
      return "" as GrassDateRange;
  }
}

export function getAstrologyDateRange(date = new Date()): AstrologyDateRange {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (month) {
    case 1:
      return day <= 19 ?
        AstrologyDateRange.capricorn : AstrologyDateRange.aquarius;
    case 2:
      return day <= 18 ?
        AstrologyDateRange.aquarius : AstrologyDateRange.pisces;
    case 3:
      return day <= 20 ?
        AstrologyDateRange.pisces : AstrologyDateRange.aries;
    case 4:
      return day <= 19 ?
        AstrologyDateRange.aries : AstrologyDateRange.taurus;
    case 5:
      return day <= 20 ?
        AstrologyDateRange.taurus : AstrologyDateRange.gemini;
    case 6:
      return day <= 21 ?
        AstrologyDateRange.gemini : AstrologyDateRange.cancer;
    case 7:
      return day <= 22 ?
        AstrologyDateRange.cancer : AstrologyDateRange.leo;
    case 8:
      return day <= 22 ?
        AstrologyDateRange.leo : AstrologyDateRange.virgo;
    case 9:
      return day <= 22 ?
        AstrologyDateRange.virgo : AstrologyDateRange.libra;
    case 10:
      return day <= 23 ?
        AstrologyDateRange.libra : AstrologyDateRange.scorpio;
    case 11:
      return day <= 22 ?
        AstrologyDateRange.scorpio : AstrologyDateRange.sagittarius;
    case 12:
      return day <= 21 ?
        AstrologyDateRange.sagittarius : AstrologyDateRange.capricorn;
    default:
      console.error("month value out of bounds for grass date range.");
      return "" as AstrologyDateRange;
  }
}
