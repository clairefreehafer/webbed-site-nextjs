import { ListItem, Prisma } from "@prisma/client";
import { getList } from "@utils/prisma/list";
import WebsiteListItem from "./WebsiteListItem";
import { WebsiteListObject } from "types/lists";

function renderListItem({ type, id, data }: ListItem) {
  if (type === "website") {
    return <WebsiteListItem {...(data as WebsiteListObject)} />;
  }
  return null;
}

type Props = Prisma.PromiseReturnType<typeof getList> & {
  type?: "ordered" | "unordered";
};

// TODO: do we want this to /just/ be the list, or also the list metadata?
// (i.e. title, description, tags)
export default function ListContainer({
  name,
  description,
  items,
  type,
}: Props) {
  if (!items || items.length === 0) return <>❌ list is empty.</>;

  return (
    <>
      <p>{description}</p>
      <ul>
        {items.map((listItem, idx) => (
          <li key={idx}>{renderListItem(listItem)}</li>
        ))}
      </ul>
    </>
  );
}
