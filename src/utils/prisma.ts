import { Prisma, PrismaClient } from "@prisma/client"
import { cache } from "react"

const prisma = new PrismaClient();

function prismaWrapper<Args, Result>(prismaFunction: (args: Args) => Result) {
  return (async (args: Args) => {
    try {
      const result = await prismaFunction(args);

      return result;
    } catch (error) {
      console.error(`👎 ${error}`);
      return (error as Error).message;
    }
  });
}

export const getAdminAlbums = cache(async () => (
  prismaWrapper(prisma.album.findMany)({
    // TODO: change to select
    include: { photos: true, coverPhoto: true },
    orderBy: { date: { sort: "desc", nulls: "first" }},
  })
));

export const getStaticParams = cache(async (section: string) => (
  prismaWrapper(prisma.album.findMany)({
    where: { section: { has: section }},
    select: { name: true, section: true }
  })
));

export const getAlbumGridData = cache(async (section: string[]) => (
  prismaWrapper(prisma.album.findMany)({
    where: { section: { hasEvery: section }},
    select: {
      id: true,
      name: true,
      coverPhoto: { select: { url: true }}
    }
  })
));

export const getAlbum = cache(async (albumName: string) => (
  prismaWrapper(prisma.album.findUnique)({
    where: { name: albumName },
    include: { photos: true, coverPhoto: true }
  })
));

export const getAlbumOptions = cache(async () => (
  prismaWrapper(prisma.album.findMany)({
    orderBy: { date: { sort: "desc", nulls: "first" } },
    select: { name: true },
  })
));

export const getSections = cache(async (section?: string) => (
  prismaWrapper(prisma.album.findMany)({
    distinct: "section",
    select: {
      section: true
    },
    ...(section && {
      where: {
        section: { has: section }
      }
    })
  })
));

export const getAdminPhotos = cache(async () => (
  prismaWrapper(prisma.photo.findMany)({
    include: { album: true, tags: true },
    orderBy: { captureDate: { sort: "desc", nulls: "first" } }
  })
));

export const getPhoto = cache(async (smugMugKey: string) => (
  prismaWrapper(prisma.photo.findUnique)({
    where: { smugMugKey }
  })
));

export const countPhotos = cache(async (args: Prisma.PhotoCountArgs) => (
  prismaWrapper(prisma.photo.count)(args)
));

export const getAllTags = cache(async () => (
  prismaWrapper(prisma.tag.findMany)({})
));

export const getPhotosWithTag = cache(async (tag: string) => (
  prismaWrapper(prisma.tag.findUnique)({
    where: { tag },
    include: { photos: true }
  })
));

export const getTag = cache(async (tag: string) => (
  prismaWrapper(prisma.tag.findUnique)({
    where: { tag }
  })
));
