import { ListItems, ListObject } from "@utils/lists/types";
import CameraListItem from "./CameraListItem";
import VideoGameListItem from "./VideoGameListItem";
import { Fragment } from "react";

function renderListItem(listItem: ListItems) {
  if ("title" in listItem) {
    return <VideoGameListItem {...listItem} />;
  }
  if ("medium" in listItem) {
    return <CameraListItem {...listItem} />;
  }
  return null;
}

type Props = ListObject & {
  type?: "ordered" | "unordered";
};

// TODO: do we want this to /just/ be the list, or also the list metadata?
// (i.e. title, description, tags)
export default function ListContainer({
  title,
  description,
  items,
  tags,
  type,
}: Props) {
  if (!items) return <>🪹 no items.</>;

  return (
    <ul>
      {items.map((listItem, idx) => (
        <Fragment key={idx}>{renderListItem(listItem)}</Fragment>
      ))}
    </ul>
  );
}
