import { Prisma } from "@prisma/client";
import { prisma, prismaWrapper } from ".";

export const createListItem = (args: Prisma.ListItemCreateArgs) =>
  prismaWrapper(prisma.listItem.create)(args);
