import { Prisma, PrismaClient } from "@prisma/client";
import { cache } from "react";
import { prismaWrapper } from "./index";

const prisma = new PrismaClient();

export const getSections = cache(async () => (
  prismaWrapper(prisma.section.findMany)({
    include: { parent: true, icon: true, children: true, albums: true }
  })
));

export const createSection = async (args: Prisma.SectionCreateArgs) => (
  prismaWrapper(prisma.section.create)(args)
);

export const getSection = cache(async (name: string) => (
  prismaWrapper(prisma.section.findUniqueOrThrow)({
    where: { name },
    include: { parent: true }
  })
));

export const updateSection = async (data: Prisma.SectionUpdateArgs) => (
  prismaWrapper(prisma.section.update)(data)
);

export const deleteSection = async (id: number) => (
  prismaWrapper(prisma.section.delete)({
    where: { id }
  })
);
