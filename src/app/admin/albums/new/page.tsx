import { getSections } from "@utils/albums";
import NewAlbumForm from "./form";

export default async function AdminAlbum() {
  const sections = await getSections();

  return (
    <NewAlbumForm sections={sections} />
  )
}
