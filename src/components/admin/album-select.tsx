import { getAlbumOptions } from "@utils/prisma";

export default async function AlbumSelect(
  { defaultValue = null }: { defaultValue?: string | null }
) {
  const albums = await getAlbumOptions();

  if (typeof albums === "string") {
    return <p>{albums}</p>;
  }

  return (
    <>
      <label>
        select album
        <select name="albumName" defaultValue={defaultValue || ""}>
          {albums.map((album) => (
            <option key={album.name}>
              {album.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        or create new album
        <input type="text" name="newAlbum" />
      </label>
    </>
  );
}