import NewAlbumForm from "./form";
import { getSectionsForHierarchy } from "@utils/prisma/section";

export default async function AdminAlbum() {
  const sections = await getSectionsForHierarchy();

  return (
    <NewAlbumForm sections={sections} />
  )
}
