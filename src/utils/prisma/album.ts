import { cache } from "react";
import { prisma, prismaWrapper } from "./index";
import { Album } from "@prisma/client";

export const getAdminAlbums = cache(async () => (
  prismaWrapper(prisma.album.findMany)({
    select: {
      id: true,
      name: true,
      sectionName: true,
      date: true,
      type: true,
      coverPhoto: {
        select: {
          url: true
        }
      },
      icon: {
        select: {
          character: true,
          imagePath: true,
        }
      },
      _count: {
        select: { photos: true }
      }
    },
    orderBy: { date: { sort: "desc", nulls: "first" }},
  })
));

export const getAlbumList = cache(async (sectionName: Album["sectionName"]) => (
  prismaWrapper(prisma.album.findMany)({
    where: { sectionName },
    select: {
      id: true,
      name: true,
      sectionName: true,
      icon: true,
    }
  })
));

export const getAlbumSection = cache(async (name: Album["name"]) => {
  const { sectionName } = await prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name },
    select: { sectionName: true }
  });
  return sectionName;
})