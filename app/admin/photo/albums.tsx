export default function Albums() {
  // const albums = await getAlbums()

  return (
    <>
      <label>
        select album
        <select name="album"></select>
      </label>
      <label>
        or create new album
        <input type="text" name="newAlbum" />
      </label>
    </>
  )
}