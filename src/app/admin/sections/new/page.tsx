import { getParentSections } from "@utils/prisma/section";
import NewSectionForm from "./form";

export default async function AdminAlbum() {
  const sections = await getParentSections();

  return (
    <NewSectionForm sections={sections} />
  );
}
