import { ListItemType } from "types/lists";
import { getListItem } from "@utils/prisma/listItem";
import EditWebsiteForm from "./website";
import ListSelect from "@components/admin/form/ListSelect";

export default async function Page({
  params: { listItemId, listItemType },
}: {
  params: { listItemId: string; listItemType: ListItemType };
}) {
  const listItem = await getListItem(parseInt(listItemId));

  switch (listItemType) {
    case "website":
      return <EditWebsiteForm listSelect={<ListSelect />} {...listItem} />;
  }

  return <>🚧 form for {listItemType}s hasn&apos;t been created yet.</>;
}
