import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Fragment } from "react";
import AdminTable from "@components/admin/table";
import DeleteButton from "@components/admin/delete-button";
import { deletePhoto } from "@actions/photo";

async function getPhotos() {
  try {
    const prisma = new PrismaClient();

    const photos = await prisma.photo.findMany({
      include: { album: true, tags: true },
      orderBy: { captureDate: { sort: "desc", nulls: "first" } }
    });

    return photos;
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return `👎 ${(error as Error).message}`;
  }
}

export default async function AdminPhotoRead() {
  const photos = await getPhotos();

  return (
    <>
      <ul>
        <li>
          <Link href="/admin/photos/new">add photo</Link>
        </li>
      </ul>
      {typeof photos === "string" ? (
        <p>{photos}</p>
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <th>smugmug key</th>
              <th>capture date</th>
              <th>album</th>
              <th>tags</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo) => (
              <tr key={photo.id}>
                <td>{photo.smugMugKey}</td>
                <td>{photo.captureDate?.toString()}</td>
                <td>{photo.albumName}</td>
                <td>{photo.tags.map((tag) => (
                  <Fragment key={tag.tag}>
                    {tag.tag}{", "}
                  </Fragment>
                ))}</td>
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
      )}

      {typeof photos !== "string" && <p>total: {photos.length}</p>}
    </>   
  )
}