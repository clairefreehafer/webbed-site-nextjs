import { getSections } from "@utils/prisma/section";
import NewSectionForm from "./form";

export default async function AdminAlbum() {
  const sections = await getSections();

  return (
    <NewSectionForm sections={sections} />
  );
}
