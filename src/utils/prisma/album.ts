import { cache } from "react";
import { prismaWrapper } from "./index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAdminAlbums = cache(async () => (
  prismaWrapper(prisma.album.findMany)({
    select: {
      id: true,
      name: true,
      sectionName: true, 
      date: true,
      type: true,
      coverPhoto: {
        select: {
          url: true
        }
      },
      icon: {
        select: {
          character: true,
          imagePath: true,
        }
      },
      _count: {
        select: { photos: true }
      }
    },
    orderBy: { date: { sort: "desc", nulls: "first" }},
  })
));