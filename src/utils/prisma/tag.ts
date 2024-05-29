import { Prisma, Tag } from "@prisma/client";
import { prisma, prismaWrapper } from "./index";
import { cache } from "react";

export const createTag = async (data: Prisma.TagCreateArgs["data"]) => (
  prismaWrapper(prisma.tag.create)({ data })
);

export const getAdminTags = cache(async () => (
  prismaWrapper(prisma.tag.findMany)({
    select: {
      id: true,
      parentName: true,
      name: true,
      _count: {
        select: {
          children: true,
          photos: true,
        }
      }
    }
  })
));

export const getPhotosWithTag = cache(async (name: string) => {
  const result = await prismaWrapper(prisma.tag.findUnique)({
    where: { name },
    select: {
      photos: {
        select: {
          smugMugKey: true,
          url: true,
        }
      }
    }
  })

  return result?.photos || [];
});

export const getTagNames = cache(async () => (
  prismaWrapper(prisma.tag.findMany)({
    select: { name: true }
  })
));

export const updateTag = async (name: Tag["name"], data: Prisma.TagUpdateArgs["data"]) => (
  prismaWrapper(prisma.tag.update)({
    where: { name },
    data
  })
)