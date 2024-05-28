import { Prisma, PrismaClient } from "@prisma/client";
import { cache } from "react";
import { prismaWrapper } from "./index";

const prisma = new PrismaClient();

export const getSections = cache(async () => (
  prismaWrapper(prisma.section.findMany)({
    include: { parent: true, icon: true, children: true, albums: true },
    orderBy: [
      { parentName: { sort: "desc" }},
      { children: { _count: "desc" }},
    ]
  })
));

export const getChildSections = cache(async (parentName: string) => (
  prismaWrapper(prisma.section.findMany)({
    where: { parentName },
    select: { name: true }
  })
))

export const getSection = cache(async (name: string) => (
  prismaWrapper(prisma.section.findUniqueOrThrow)({
    where: { name },
    select: {
      id: true,
      name: true,
      parentName: true,
      parent: {
        select: {
          name: true,
          parentName: true,
        }
      }
    }
  })
));

export const createSection = async (args: Prisma.SectionCreateArgs) => (
  prismaWrapper(prisma.section.create)(args)
);

export const updateSection = async (data: Prisma.SectionUpdateArgs) => (
  prismaWrapper(prisma.section.update)(data)
);

export const deleteSection = async (id: number) => (
  prismaWrapper(prisma.section.delete)({
    where: { id }
  })
);
