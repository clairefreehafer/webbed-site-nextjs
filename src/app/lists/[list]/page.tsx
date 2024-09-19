import { displayName } from "@utils/album";
import ListContainer from "@components/lists/ListContainer";
import { getList, getLists } from "@utils/prisma/list";

export async function generateStaticParams() {
  const lists = await getLists();

  return lists.map((listItem) => ({
    list: listItem.name,
  }));
}

// TODO: add way to separate sections, i.e. for digital and film cameras?
// or maybe could just make them two separate lists 🤔
export default async function Page({ params }: { params: { list: string } }) {
  const list = await getList(displayName(params.list));

  if (!list) return <>list not found!</>;

  return (
    <>
      <h2>{list.name}</h2>
      <p>{list.description}</p>
      <ListContainer {...list} />
    </>
  );
}
