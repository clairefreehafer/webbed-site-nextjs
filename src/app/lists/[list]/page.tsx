import { displayName } from "@utils/albums";
import lists from "../lists.json";
import { ListObject } from "@utils/types/lists";
import ListContainer from "@components/lists/ListContainer";

export function generateStaticParams() {
  return lists.map((listItem) => ({
    list: listItem.title,
  }));
}

// TODO: add way to separate sections, i.e. for digital and film cameras?
// or maybe could just make them two separate lists 🤔
export default function Page({ params }: { params: { list: string } }) {
  const list: ListObject = lists.find(
    (listItem) => listItem.title === displayName(params.list),
  ) as ListObject;

  if (!list) return <>list not found!</>;

  return (
    <>
      <h2>{list.title}</h2>
      <p>{list.description}</p>
      <ListContainer {...list} />
      <h3>list tags:</h3>
      <p>{list.tags?.map((tag, idx) => <span key={idx}>{tag}</span>)}</p>
    </>
  );
}
