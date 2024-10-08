import StyledLink from "@components/Link";
import AdminLinkList from "@components/admin/LinkList";
import { listItemTypes } from "types/lists";

export default async function Page() {
  return (
    <>
      <p>
        <StyledLink href="/admin/list-items/new">+ add list item</StyledLink>
      </p>
      <AdminLinkList
        links={listItemTypes.map(
          (listItemType) => `list-items/${listItemType}`
        )}
      />
    </>
  );
}
