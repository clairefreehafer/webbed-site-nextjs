import { getAlbums } from "../actions";

export default async function AdminReadAlbumPage() {
  const albums = await getAlbums();

  return (
    <>
      <h3>read</h3>

      {typeof albums === "string" ? (
        <p>{albums}</p>
      ) : (
        <table>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>date</th>
            <th>number of photos</th>
          </tr>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.name}</td>
              <td>{album.date?.toString()}</td>
              <td>{album.photos?.length}</td>
            </tr>
          ))}
        </table>
      )}

      {typeof albums !== "string" && <p>total: {albums.length}</p>}
    </>
  )
}