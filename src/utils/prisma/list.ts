import { cache } from "react";
import { prisma, prismaWrapper } from ".";
import { List, Prisma } from "@prisma/client";
import { AdminTableListItem } from "@app/admin/lists/page";
import { slugName } from "@utils/album";

export const getAdminLists = cache(async (): Promise<AdminTableListItem> => {
  const lists = await prismaWrapper(prisma.list.findMany)({
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: { items: true },
      },
    },
  });

  if (!lists) return [];

  return lists.map((list) => {
    return {
      id: list.id,
      name: list.name,
      description: list.description ?? undefined,
      numberOfItems: list._count.items,
      slug: slugName(list.name),
    };
  });
});

export const getLists = cache(async () =>
  prismaWrapper(prisma.list.findMany)({
    select: {
      id: true,
      name: true,
      description: true,
      items: true,
    },
  })
);

export const getList = cache(async (name: List["name"]) => {
  return prismaWrapper(prisma.list.findUniqueOrThrow)({
    where: { name },
    select: {
      id: true,
      name: true,
      description: true,
      items: true,
    },
  });
});

export const findUniqueList = cache(
  async (args: Prisma.ListFindUniqueOrThrowArgs) =>
    prismaWrapper(prisma.list.findUniqueOrThrow)(args)
);

export const findManyLists = cache(async (args: Prisma.ListFindManyArgs) =>
  prismaWrapper(prisma.list.findMany)(args)
);

export const createList = (args: Prisma.ListCreateArgs) =>
  prismaWrapper(prisma.list.create)(args);

export const updateList = (args: Prisma.ListUpdateArgs) =>
  prismaWrapper(prisma.list.update)(args);
