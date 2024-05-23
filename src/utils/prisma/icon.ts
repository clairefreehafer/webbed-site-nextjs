import { Prisma, PrismaClient } from "@prisma/client";
import { cache } from "react";
import { prismaWrapper } from "./index";


const prisma = new PrismaClient();

export const getIcons = cache(() => (
  prismaWrapper(prisma.icon.findMany)({
    select: {
      id: true,
      imagePath: true,
      character: true,
      albums: { select: { name: true }}
    }
  })
));

export const createIcon = (data: Prisma.IconCreateArgs) => (
  prismaWrapper(prisma.icon.create)(data)
);