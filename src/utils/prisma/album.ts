import { cache } from "react";
import { prisma, prismaWrapper } from "./index";
import { Album, Prisma } from "@prisma/client";
import { getAncestorSections, getRootSection } from "@utils/section";
import { IconListAlbum } from "@components/IconList";

export const getAdminAlbums = cache(
  async () =>
    prismaWrapper(prisma.album.findMany)({
      select: {
        id: true,
        name: true,
        sectionName: true,
        date: true,
        type: true,
        coverPhoto: {
          select: {
            url: true,
            altText: true,
          },
        },
        icon: {
          select: {
            character: true,
            imagePath: true,
            text: true,
          },
        },
        _count: {
          select: { photos: true },
        },
      },
      orderBy: { date: { sort: "desc", nulls: "first" } },
    }) ?? []
);

export const getAlbumData = cache(async (name: Album["name"]) => {
  const album = await prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name },
    select: {
      id: true,
      name: true,
      date: true,
      type: true,
      coverKey: true,
      iconId: true,
      section: {
        select: {
          name: true,
          parentName: true,
        },
      },
      photos: {
        select: {
          smugMugKey: true,
          url: true,
        },
      },
    },
  });

  const rootSection = await getRootSection(album.section);

  return {
    ...album,
    rootSection,
  };
});

export const getAlbumList = cache(async (sectionName: Album["sectionName"]) =>
  prismaWrapper(prisma.album.findMany)({
    where: { sectionName },
    select: {
      id: true,
      name: true,
      sectionName: true,
      icon: true,
    },
  })
);

export const getPhotographyAlbumPhotos = cache(async (name: Album["name"]) =>
  prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name },
    select: {
      type: true,
      photos: {
        select: {
          url: true,
          altText: true,
        },
      },
    },
  })
);

export const getAlbumSection = cache(async (name: Album["name"]) => {
  const { sectionName } = await prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name },
    select: { sectionName: true },
  });
  return sectionName;
});

export const getIconListAlbums = cache(
  async (sectionName: string): Promise<IconListAlbum[]> => {
    const albums = await prismaWrapper(prisma.album.findMany)({
      where: { sectionName },
      select: {
        id: true,
        date: true,
        name: true,
        icon: {
          select: {
            imagePath: true,
            character: true,
            text: true,
          },
        },
        section: {
          select: {
            name: true,
            parentName: true,
          },
        },
      },
    });

    const result: IconListAlbum[] = [];

    for (let album of albums) {
      const sectionArray = await getAncestorSections(album.section);

      result.push({
        id: album.id,
        icon: album.icon,
        date: album.date,
        name: album.name,
        sectionArray,
      });
    }

    return result;
  }
);

export const getAlbumsInSections = cache(async (sections: string[]) =>
  prismaWrapper(prisma.album.findMany)({
    where: {
      sectionName: { in: sections },
    },
  })
);

export const getAlbumNames = cache(async () =>
  prismaWrapper(prisma.album.findMany)({
    select: { name: true },
    orderBy: { name: "asc" },
  })
);

export const createAlbum = async (args: Prisma.AlbumCreateArgs) =>
  prismaWrapper(prisma.album.create)(args);

export const updateAlbum = async (args: Prisma.AlbumUpdateArgs) =>
  prismaWrapper(prisma.album.update)(args);
