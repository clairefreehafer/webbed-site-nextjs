import { Prisma } from "@prisma/client";
import { prisma, prismaWrapper } from ".";
import { ListItemType } from "types/lists";
import { cache } from "react";

export const getListItemsByType = cache(async (type: ListItemType) => {
  const listItems = await prismaWrapper(prisma.listItem.findMany)({
    where: { type },
    select: {
      id: true,
      data: true,
    },
  });

  return listItems.map(({ id, data }) => ({ id, ...data }));
});

export const getListItem = cache(async (listItemId: number) => {
  const listItem = await prismaWrapper(prisma.listItem.findUniqueOrThrow)({
    where: { id: listItemId },
  });

  return { id: listItem.id, ...listItem.data };
});

export const createListItem = async (args: Prisma.ListItemCreateArgs) =>
  prismaWrapper(prisma.listItem.create)(args);

export const updateListItem = async (args: Prisma.ListItemUpdateArgs) =>
  prismaWrapper(prisma.listItem.update)(args);
