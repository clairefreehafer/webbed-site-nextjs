import { Prisma, PrismaClient } from "@prisma/client";
import { cache } from "react";

const prisma = new PrismaClient();

function prismaWrapper<Args, Result>(prismaFunction: (args: Args) => Result) {
  return async (args: Args) => {
    try {
      const result = await prismaFunction(args);

      return result;
    } catch (error) {
      console.error(`👎 ${error}`);
      throw error;
    }
  };
}

export const getMostRecentPhotoDate = async (albumName: string) =>
  prismaWrapper(prisma.photo.findFirst)({
    where: { albumName },
    orderBy: { captureDate: { sort: "desc" } },
    select: { captureDate: true },
  });

export const getAlbumNames = cache(async () =>
  prismaWrapper(prisma.album.findMany)({
    select: { name: true },
    orderBy: { name: "asc" },
  }),
);

export const getAdminPhotos = cache(async () =>
  prismaWrapper(prisma.photo.findMany)({
    include: { album: true, tags: true },
    orderBy: { captureDate: { sort: "desc", nulls: "first" } },
  }),
);

export const getPhoto = cache(async (smugMugKey: string) =>
  prismaWrapper(prisma.photo.findUniqueOrThrow)({
    where: { smugMugKey },
  }),
);

export const countPhotos = cache(async (args: Prisma.PhotoCountArgs) =>
  prismaWrapper(prisma.photo.count)(args),
);

export const getAllTags = cache(async () =>
  prismaWrapper(prisma.tag.findMany)({}),
);

export const getPhotosWithTag = cache(async (name: string) => {
  const result = await prismaWrapper(prisma.tag.findUnique)({
    where: { name },
    select: {
      photos: {
        select: {
          url: true,
          altText: true,
        },
      },
    },
  });

  return result?.photos || [];
});

export const getTag = cache(async (name: string) =>
  prismaWrapper(prisma.tag.findUnique)({
    where: { name },
  }),
);
