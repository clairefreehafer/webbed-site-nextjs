import { deleteAlbum } from "@actions/album";
import DeleteButton from "@components/admin/delete-button";
import NumberOfPhotos from "@components/admin/number-of-photos";
import AdminTable from "@components/admin/table";
import Icon from "@components/icon";
import { AlbumTypes, slugName } from "@utils/albums";
import { sizePhoto } from "@utils/photo";
import { getAdminAlbums } from "@utils/prisma/album";
import Link from "next/link";

export default async function AdminReadAlbumPage() {
  const albums = await getAdminAlbums();

  return (
    <>
      <p>
        <Link href="/admin/albums/new">add album</Link>
      </p>
      <AdminTable>
        <thead>
          <tr>
            <th>cover photo</th>
            <th>icon</th>
            <th>name</th>
            <th>section</th>
            <th>date</th>
            <th>type</th>
            <th>number of photos</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        {albums.map((album) => (
          <tbody key={album.id}>
            <tr>
              <td>
                <img src={sizePhoto(album.coverPhoto?.url || "", "Th")} alt="" />
              </td>
              <td><Icon icon={album.icon} height={3} /></td>
              <td>{album.name}</td>
              <td>{album.sectionName}</td>
              <td>{album.date?.toString()}</td>
              <td>{album.type}</td>
              <NumberOfPhotos
                albumName={album.name}
                albumType={album.type as AlbumTypes}
                photoCount={album._count.photos}
              />
              <td>
                <Link href={`/admin/albums/${slugName(album.name)}`}>
                  edit
                </Link>
              </td>
              <td>
                <DeleteButton serverAction={deleteAlbum} value={album.id} />
              </td>
            </tr>
          </tbody>
        ))}
      </AdminTable>

      <p>total: {albums.length}</p>
    </>
  )
}