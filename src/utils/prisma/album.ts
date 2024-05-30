import { cache } from "react";
import { prisma, prismaWrapper } from "./index";
import { Album } from "@prisma/client";
import { getRootSection } from "@utils/section";

export const getAdminAlbums = cache(async () =>
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
        },
      },
      _count: {
        select: { photos: true },
      },
    },
    orderBy: { date: { sort: "desc", nulls: "first" } },
  }),
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
  }),
);

export const getPhotographyAlbumPhotos = cache(async (name: Album["name"]) =>
  prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name },
    select: {
      type: true,
      photos: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  }),
);

export const getAlbumSection = cache(async (name: Album["name"]) => {
  const { sectionName } = await prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name },
    select: { sectionName: true },
  });
  return sectionName;
});

export const getStaticParams = cache(async (sectionName: string) =>
  prismaWrapper(prisma.album.findMany)({
    where: { sectionName },
    select: {
      name: true,
      sectionName: true,
    },
  }),
);
