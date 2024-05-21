import NewAlbumForm from "./form";
import { getSections } from "@utils/prisma/section";

export default async function AdminAlbum() {
  const sections = await getSections();

  return (
    <NewAlbumForm sections={sections} />
  )
}
