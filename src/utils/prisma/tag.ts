import { Prisma, Tag } from "@prisma/client";
import { prisma, prismaWrapper } from "./index";
import { cache } from "react";
import { displayName } from "@utils/albums";

export const createTag = async (data: Prisma.TagCreateArgs["data"]) =>
  prismaWrapper(prisma.tag.create)({ data });

export const getAdminTags = cache(async () =>
  prismaWrapper(prisma.tag.findMany)({
    select: {
      id: true,
      parentName: true,
      name: true,
      _count: {
        select: {
          children: true,
          photos: true,
        },
      },
    },
  }),
);

export const getPhotosWithTag = cache(async (name: string) => {
  const result = await prismaWrapper(prisma.tag.findUnique)({
    where: { name },
    select: {
      photos: {
        select: {
          smugMugKey: true,
          url: true,
          altText: true,
        },
      },
    },
  });

  return result?.photos || [];
});

export const getTag = cache(async (name: Tag["name"]) =>
  prismaWrapper(prisma.tag.findUniqueOrThrow)({
    where: { name: displayName(name) },
  }),
);

export const getTagNames = cache(async () =>
  prismaWrapper(prisma.tag.findMany)({
    select: { name: true },
  }),
);

export const getParentTagOptions = cache(async () => {
  const tags = await prismaWrapper(prisma.tag.findMany)({
    select: { name: true },
  });

  return ["(none)", ...tags.map(({ name }) => name)];
});

export const updateTag = async (
  name: Tag["name"],
  data: Prisma.TagUpdateArgs["data"],
) =>
  prismaWrapper(prisma.tag.update)({
    where: { name },
    data,
  });
