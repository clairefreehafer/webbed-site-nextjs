import NewSectionForm from "./form";
import ParentSectionSelect from "@components/admin/form/parent-section-select";

export default async function AdminAlbum() {
  return <NewSectionForm parentSectionSelect={<ParentSectionSelect />} />;
}
