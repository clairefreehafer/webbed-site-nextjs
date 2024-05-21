import { Prisma, PrismaClient } from "@prisma/client"
import { cache } from "react"
import { getAncestorSections } from "./section";

const prisma = new PrismaClient();

function prismaWrapper<Args, Result>(prismaFunction: (args: Args) => Result) {
  return (async (args: Args) => {
    try {
      const result = await prismaFunction(args);

      return result;
    } catch (error) {
      console.error(`👎 ${error}`);
      throw error;
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
    where: { section: { name: section }},
    select: {
      name: true,
      section: {
        select: {
          name: true,
        }
      }
    }
  })
));

export const getAlbumGridData = cache(async (section: string) => {
  const albums = await prismaWrapper(prisma.album.findMany)({
    where: { section: { name: section }},
    select: {
      id: true,
      name: true,
      section: {
        select: {
          name: true,
          parent: true,
        }
      },
      date: true,
      coverPhoto: { select: { url: true }}
    }
  });

  const result = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.section);
    result.push({ ...album, sectionArray });
  }

  return result;
});

export const getAlbum = cache(async (albumName: string) => (
  prismaWrapper(prisma.album.findUniqueOrThrow)({
    where: { name: albumName },
    include: { photos: true, coverPhoto: true, section: true }
  })
));

export const createAlbum = async (args: Prisma.AlbumCreateArgs) => (
  prismaWrapper(prisma.album.create)(args)
);

export const updateAlbum = async (args: Prisma.AlbumUpdateArgs) => (
  prismaWrapper(prisma.album.update)(args)
);

export const getMostRecentPhotoDate = async (albumName: string) => (
  prismaWrapper(prisma.photo.findFirst)({
    where: { albumName },
    orderBy: { captureDate: { sort: "desc" }},
    select: { captureDate: true }
  })
);

export const getAlbumOptions = cache(async () => (
  prismaWrapper(prisma.album.findMany)({
    orderBy: { date: { sort: "desc", nulls: "first" } },
    select: { name: true },
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

export const getPhotosWithTag = cache(async (name: string) => {
  const result = await prismaWrapper(prisma.tag.findUnique)({
    where: { name },
    include: { photos: true }
  })

  return result?.photos || [];
});

export const getTag = cache(async (name: string) => (
  prismaWrapper(prisma.tag.findUnique)({
    where: { name }
  })
));
