import { Prisma, PrismaClient } from "@prisma/client";
import { cache } from "react";
import { prismaWrapper } from "./index";

const prisma = new PrismaClient();

export const getIcons = cache(async () =>
  prismaWrapper(prisma.icon.findMany)({
    select: {
      id: true,
      imagePath: true,
      character: true,
      text: true,
    },
  })
);

export const getIconsWithAlbums = cache(async () =>
  prismaWrapper(prisma.icon.findMany)({
    select: {
      id: true,
      imagePath: true,
      character: true,
      text: true,
      albums: { select: { name: true } },
    },
  })
);

export const getIconData = cache(async (id: number) =>
  prismaWrapper(prisma.icon.findUniqueOrThrow)({
    where: { id },
  })
);

export const findManyIcons = cache(async (args: Prisma.IconFindManyArgs) =>
  prismaWrapper(prisma.icon.findMany)(args)
);

export const createIcon = (data: Prisma.IconCreateArgs) =>
  prismaWrapper(prisma.icon.create)(data);

export const updateIcon = (data: Prisma.IconUpdateArgs) =>
  prismaWrapper(prisma.icon.update)(data);
