import { displayName, slugName } from "@utils/album";
import ListContainer from "@components/lists/ListContainer";
import { getList, getLists } from "@utils/prisma/list";

export async function generateStaticParams() {
  const lists = await getLists();

  return lists.map((listItem) => ({
    list: slugName(listItem.name),
  }));
}

export default async function Page({ params }: { params: { list: string } }) {
  const list = await getList(displayName(params.list));

  if (!list) return <>list not found!</>;

  return <ListContainer {...list} />;
}
