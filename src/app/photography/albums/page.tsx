import { getAlbums } from "@/utils/photography/digikam";

export default async function Page() {
  const albums = getAlbums();

  return (
    <ul>
      {albums.map((album) => (
        <li key={album.relativePath}>{album.relativePath}</li>
      ))}
    </ul>
  );
}
