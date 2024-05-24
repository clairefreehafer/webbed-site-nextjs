import { Photo, Prisma, Tag } from "@prisma/client";
import { prisma, prismaWrapper } from "./index";
import { cache } from "react";
import { getAncestorSections } from "@utils/section";

export const updatePhoto = (
  smugMugKey: Photo["smugMugKey"],
  data: Prisma.PhotoUpdateArgs["data"]
) => (
  prismaWrapper(prisma.photo.update)({
    where: { smugMugKey },
    data
  })
);

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