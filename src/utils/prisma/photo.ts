import { Photo, Prisma } from "@prisma/client";
import { prisma, prismaWrapper } from "./index";

export const updatePhoto = (
  smugMugKey: Photo["smugMugKey"],
  data: Prisma.PhotoUpdateArgs["data"]
) => (
  prismaWrapper(prisma.photo.update)({
    where: { smugMugKey },
    data
  })
)