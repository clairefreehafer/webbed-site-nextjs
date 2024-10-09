import AdminLinkList from "@components/admin/LinkList";
import { listItemTypes } from "types/lists";

export default async function Page() {
  return (
    <AdminLinkList
      links={listItemTypes.map((listItemType) => `list-items/${listItemType}`)}
    />
  );
}
