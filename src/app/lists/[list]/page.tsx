import { displayName, slugName } from "@utils/album";
import ListContainer from "@components/lists/ListContainer";
import { prisma } from "@utils/prisma";
import { Prisma } from "@prisma/client";

export async function generateStaticParams() {
  const lists = await prisma.list.findMany();

  return lists.map((listItem) => ({
    list: slugName(listItem.name),
  }));
}

export default async function Page({ params }: { params: { list: string } }) {
  const args = {
    where: { name: displayName(params.list) },
    select: {
      id: true,
      name: true,
      description: true,
      items: true,
    },
  } satisfies Prisma.ListFindUniqueOrThrowArgs;
  const list = await prisma.list.findUniqueOrThrow(args);

  if (!list) return <>list not found!</>;

  return <ListContainer {...list} />;
}
