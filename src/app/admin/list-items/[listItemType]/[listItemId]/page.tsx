import { ListItemType } from "types/lists";
import { getListItem } from "@utils/prisma/listItem";
import EditWebsiteForm from "./website";
import { Prisma } from "@prisma/client";
import { WebsiteListItemFormState } from "@actions/listItem";

export default async function Page({
  params: { listItemId, listItemType },
}: {
  params: { listItemId: string; listItemType: ListItemType };
}) {
  const listItem = (await getListItem(
    parseInt(listItemId)
  )) as WebsiteListItemFormState;
  switch (listItemType) {
    case "website":
      return <EditWebsiteForm {...listItem} />;
  }
}
