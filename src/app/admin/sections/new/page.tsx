import NewSectionForm from "./form";
import ParentSectionSelect from "@components/admin/form/ParentSectionSelect";

export default async function AdminAlbum() {
  return <NewSectionForm parentSectionSelect={<ParentSectionSelect />} />;
}
