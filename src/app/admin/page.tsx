import AdminLinkList from "@components/admin/LinkList";
import { listItemTypes } from "types/lists";

const galleryLinks = ["sections", "albums", "photos", "tags", "icons"];
const listLinks = ["lists", "list-items", "recipes"];

export default function AdminPage() {
  return (
    <>
      <AdminLinkList links={galleryLinks} />
      <AdminLinkList links={listLinks} />
    </>
  );
}
