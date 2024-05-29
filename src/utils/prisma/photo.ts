import { Photo, Prisma, Tag } from "@prisma/client";
import { prisma, prismaWrapper } from "./index";
import { cache } from "react";
import { getAncestorSections, getRootSection } from "@utils/section";

export const updatePhoto = (
  smugMugKey: Photo["smugMugKey"],
  data: Prisma.PhotoUpdateArgs["data"]
) => (
  prismaWrapper(prisma.photo.update)({
    where: { smugMugKey },
    data
  })
);

/** zelda slideshow page */
export const getAlbumPhotos = cache(async (albumName: Photo["albumName"]) => (
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
        }
      },
      icon: {
        select: {
          imagePath: true
        }
      }
    }
  })
))

const getRandomTaggedPhoto = cache(async (tag: Tag["name"]) => {
  const photos = await prismaWrapper(prisma.photo.findMany)({
    where: { tags: { some: { name: tag } }},
    select: { url: true }
  });

  const randomIndex = Math.floor(Math.random() * (photos.length - 1));
  return photos[randomIndex]
});

export const getPolaroidGridData = cache(async (section: string) => {
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
      coverPhoto: { select: { url: true }},
      type: true,
      icon: {
        select: {
          imagePath: true,
          character: true,
        }
      },
      photos: {
        select: {
          url: true,
        }
      }
    }
  });

  const result = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.section);
    let randomCoverPhoto: Partial<Prisma.PromiseReturnType<typeof getRandomTaggedPhoto>> = {};

    if (!album.coverPhoto && album.type === "tag") {
      randomCoverPhoto = await getRandomTaggedPhoto(album.name);
    }

    result.push({ ...album, sectionArray, randomCoverPhoto });
  }

  return result;
});

export const getZeldaAdminPhotos = cache(async () => {
  return prismaWrapper(prisma.photo.findMany)({
    where: {
      album: {
        section: {
          parentName: "zelda"
        }
      }
    },
    select: {
      id: true,
      albumName: true,
      url: true,
      smugMugKey: true,
      metadata: true
    }
  });
})

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
          section: true
        }
      }
    }
  })

  let rootSection = null;
  if (photo.album) {
    rootSection = await getRootSection(photo.album.section);
  }

  return {
    ...photo,
    rootSection,
  }
})