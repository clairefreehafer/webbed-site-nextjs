import { displayName } from "@utils/albums";
import lists from "../lists.json";
import {
  CameraListObject,
  ListObject,
  VideoGameListObject,
} from "@utils/types/lists";
import { Fragment, ReactNode } from "react";
import VideoGameListItem from "@components/lists/VideoGameListItem";
import CameraListItem from "@components/lists/CameraListItem";

export function generateStaticParams() {
  return lists.map((listItem) => ({
    list: listItem.title,
  }));
}

function renderListItem(listItem: CameraListObject | VideoGameListObject) {
  if ("title" in listItem) {
    return <VideoGameListItem {...listItem} />;
  }
  if ("medium" in listItem) {
    return <CameraListItem {...listItem} />;
  }
  return null;
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
      <ul>
        {list.items.map((listItem, idx) => (
          <Fragment key={idx}>{renderListItem(listItem)}</Fragment>
        ))}
      </ul>
      <h3>list tags:</h3>
      <p>{list.tags?.map((tag, idx) => <span key={idx}>{tag}</span>)}</p>
    </>
  );
}
