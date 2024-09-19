import { CameraListObject, VideoGameListObject } from "types/lists";
import CameraListItem from "./CameraListItem";
import VideoGameListItem from "./VideoGameListItem";
import { Fragment } from "react";
import { ListItem, Prisma } from "@prisma/client";
import { getList } from "@utils/prisma/list";

function renderListItem(listItem: ListItem) {
  if (listItem.type === "video game") {
    return <VideoGameListItem {...(listItem.data as VideoGameListObject)} />;
  }
  if (listItem.type === "camera") {
    return <CameraListItem {...(listItem.data as CameraListObject)} />;
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
  if (!items) return <>❌ list is empty.</>;

  // TODO: add sort (here or api?)

  return (
    <ul>
      {items.map((listItem, idx) => (
        <Fragment key={idx}>{renderListItem(listItem)}</Fragment>
      ))}
    </ul>
  );
}
