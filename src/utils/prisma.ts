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
      section: true,
      date: true,
      coverPhoto: { select: { url: true }}
    }
  })
));

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

export const getPhotosWithTag = cache(async (name: string) => {
  const { photos } = await prismaWrapper(prisma.tag.findUnique)({
    where: { name },
    include: { photos: true }
  })

  return photos;
});

export const getTag = cache(async (name: string) => (
  prismaWrapper(prisma.tag.findUnique)({
    where: { name }
  })
));
