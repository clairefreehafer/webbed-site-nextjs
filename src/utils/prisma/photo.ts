import { Photo, Prisma, Tag } from "@prisma/client";
import { prisma, prismaWrapper } from "./index";
import { cache } from "react";
import { getRootSection } from "@utils/section";
import { PolaroidGridAlbum } from "@components/photography/PolaroidGrid";

export const updatePhoto = (
  smugMugKey: Photo["smugMugKey"],
  data: Prisma.PhotoUpdateArgs["data"],
) =>
  prismaWrapper(prisma.photo.update)({
    where: { smugMugKey },
    data,
  });

export const getAdminPhotos = cache(async () =>
  prismaWrapper(prisma.photo.findMany)({
    select: {
      id: true,
      url: true,
      altText: true,
      smugMugKey: true,
      captureDate: true,
      albumName: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  }),
);

/** zelda slideshow page */
export const getAlbumPhotos = cache(async (albumName: Photo["albumName"]) =>
  prismaWrapper(prisma.photo.findMany)({
    where: { albumName },
    select: {
      id: true,
      url: true,
      altText: true,
      metadata: true,
      album: {
        select: {
          date: true,
        },
      },
      icon: {
        select: {
          imagePath: true,
        },
      },
    },
  }),
);

const getRandomTaggedPhoto = cache(async (tag: Tag["name"]) => {
  const photos = await prismaWrapper(prisma.photo.findMany)({
    where: { tags: { some: { name: tag } } },
    select: { url: true },
  });

  const randomIndex = Math.floor(Math.random() * (photos.length - 1));
  return photos[randomIndex];
});

export const getPolaroidGridData = cache(
  async (section: string): Promise<PolaroidGridAlbum[]> => {
    const albums = await prismaWrapper(prisma.album.findMany)({
      where: { section: { name: section } },
      select: {
        id: true,
        name: true,
        section: {
          select: {
            name: true,
            parent: true,
          },
        },
        date: true,
        coverPhoto: { select: { url: true } },
        type: true,
        icon: {
          select: {
            imagePath: true,
            character: true,
            text: true,
          },
        },
        photos: {
          select: {
            url: true,
          },
        },
      },
    });

    const result: PolaroidGridAlbum[] = [];

    for (let album of albums) {
      let randomCoverPhoto: Partial<
        Prisma.PromiseReturnType<typeof getRandomTaggedPhoto>
      > = {};

      if (!album.coverPhoto && album.type === "tag") {
        randomCoverPhoto = await getRandomTaggedPhoto(album.name);
      }

      result.push({
        id: album.id,
        name: album.name,
        icon: album.icon,
        coverPhoto: album.coverPhoto,
        randomCoverPhoto,
      });
    }

    return result;
  },
);

export const getZeldaAdminPhotos = cache(async () => {
  return prismaWrapper(prisma.photo.findMany)({
    where: {
      album: {
        section: {
          parentName: "zelda",
        },
      },
    },
    select: {
      id: true,
      albumName: true,
      url: true,
      smugMugKey: true,
      metadata: true,
      altText: true,
      icon: {
        select: {
          imagePath: true,
          character: true,
          text: true,
        },
      },
    },
  });
});

/** update photo form */
export const getAdminPhoto = cache(async (smugMugKey: string) => {
  const photo = await prismaWrapper(prisma.photo.findUniqueOrThrow)({
    where: { smugMugKey },
    select: {
      smugMugKey: true,
      xmpPath: true,
      url: true,
      captureDate: true,
      metadata: true,
      altText: true,
      albumName: true,
      iconId: true,
      album: {
        select: {
          section: true,
        },
      },
    },
  });

  let rootSection = null;
  if (photo.album) {
    rootSection = await getRootSection(photo.album.section);
  }

  return {
    ...photo,
    rootSection,
  };
});

export const getMostRecentPhotoDate = async (albumName: string) =>
  prismaWrapper(prisma.photo.findFirst)({
    where: { albumName },
    orderBy: { captureDate: { sort: "desc" } },
    select: { captureDate: true },
  });

export const countPhotos = cache(async (args: Prisma.PhotoCountArgs) =>
  prismaWrapper(prisma.photo.count)(args),
);
