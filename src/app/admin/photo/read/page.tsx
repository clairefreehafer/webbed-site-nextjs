import { PrismaClient } from "@prisma/client";
import styles from "./page.module.scss";
import Link from "next/link";
import { Fragment } from "react";

const { table } = styles;

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
      <h3>read</h3>

      {typeof photos === "string" ? (
        <p>{photos}</p>
      ) : (
        <table className={table}>
          <thead>
            <tr>
              <th>id</th>
              <th>smugmug key</th>
              <th>capture date</th>
              <th>album</th>
              <th>tags</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo) => (
              <tr key={photo.id}>
                <td>{photo.id}</td>
                <td>{photo.smugMugKey}</td>
                <td>{photo.captureDate?.toString()}</td>
                <td>{photo.albumName}</td>
                <td>{photo.tags.map((tag) => (
                  <Fragment key={tag.tag}>
                    {tag.tag}{", "}
                  </Fragment>
                ))}</td>
                <td>
                  <Link href={`/admin/photo/update/${photo.smugMugKey}`}>
                    edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {typeof photos !== "string" && <p>total: {photos.length}</p>}
          </>   
  )
}