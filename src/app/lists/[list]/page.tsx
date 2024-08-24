import { displayName } from "@utils/albums";
import lists from "../lists.json";

export function generateStaticParams() {
  return lists.map((listItem) => ({
    list: listItem.title,
  }));
}

export default function Page({ params }: { params: { list: string } }) {
  const list = lists.find(
    (listItem) => listItem.title === displayName(params.list),
  );

  if (!list) return <>list not found!</>;

  return (
    <>
      <h2>{list.title}</h2>
      <ul>
        {list.items.map((listItem, idx) => (
          <li key={idx}>{listItem.title}</li>
        ))}
      </ul>
      <h3>list tags:</h3>
      <p>
        {list.tags.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </p>
    </>
  );
}
