import { getSectionsArr } from "@utils/albums";
import NewAlbumForm from "./form";

export default async function AdminAlbum() {
  const sections = await getSectionsArr();

  return (
    <NewAlbumForm sections={sections} />
  )
}
