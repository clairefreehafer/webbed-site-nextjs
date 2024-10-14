import AdminLinkList from "@components/admin/LinkList";
import { listItemTypes } from "types/lists";

const galleryLinks = ["sections", "albums", "photos", "tags", "icons"];
const listLinks = ["lists", "list-items"];
const recipeLinks = ["recipes", "food"];

export default function AdminPage() {
  return (
    <>
      <AdminLinkList links={galleryLinks} />
      <AdminLinkList links={listLinks} />
      <AdminLinkList links={recipeLinks} />
    </>
  );
}
