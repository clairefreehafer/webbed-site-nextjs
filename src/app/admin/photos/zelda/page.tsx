import Link from "next/link";
import AdminTable from "@components/admin/table";
import DeleteButton from "@components/admin/delete-button";
import { deletePhoto } from "@actions/photo";
import { getZeldaAdminPhotos } from "@utils/prisma/photo";

export default async function AdminPhotoRead() {
  const photos = await getZeldaAdminPhotos();

  return (
    <>
      <ul>
        <li>
          <Link href="/admin/photos/new">add photo</Link>
        </li>
      </ul>
      <AdminTable>
        <thead>
          <tr>
            <th>thumbnail</th>
            <th>album</th>
            <th>title</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td><img src={photo.url?.replaceAll("#size#", "Th")} alt="" /></td>
              <td>{photo.albumName}</td>
              <td>{photo.metadata?.title}</td>
              <td>
                <Link href={`/admin/photos/${photo.smugMugKey}`}>
                  edit
                </Link>
              </td>
              <td>
                <DeleteButton serverAction={deletePhoto} value={photo.smugMugKey} />
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      <p>total: {photos.length}</p>
    </>
  )
}