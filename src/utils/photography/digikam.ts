import BetterSqlite3 from "better-sqlite3";
import { cache } from "react";

let digikam: BetterSqlite3.Database | undefined = undefined;

if (!digikam) {
  digikam = new BetterSqlite3(`${process.cwd()}/digikam4.db`, {
    readonly: true,
    fileMustExist: true,
    verbose: console.log,
  });
  console.log("👉 connected to digikam database.");

  digikam
    .prepare(
      `ATTACH DATABASE '${process.cwd()}/thumbnails-digikam.db' AS thumbs`
    )
    .run();
  console.log("👉 attached thumbnail database.");

  process.on("exit", () => {
    digikam?.close();
    console.log("👉 disconnected from digikam database.");
  });
}

const rootAlbumEqualsEdited = "Albums.albumRoot = 3";

export const getChronologicalImages = () => {
  return digikam
    .prepare(
      `
        SELECT
          *
        FROM
          Images
            INNER JOIN ImageInformation ON Images.id = ImageInformation.imageid
            LEFT JOIN Albums ON Images.album = Albums.id
            LEFT JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
            INNER JOIN thumbs.FilePaths ON Images.id = thumbs.FilePaths.thumbId
          WHERE ${rootAlbumEqualsEdited}
          ORDER BY
            ImageInformation.creationDate DESC
          LIMIT 100
      `
    )
    .all();
};

interface Album {
  relativePath: string;
}

export const getAlbums = cache((): Album[] => {
  console.log("[getAlbums]");
  return digikam
    .prepare<[], Album>(
      `
        SELECT
          *
        FROM
          Albums
            INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        WHERE ${rootAlbumEqualsEdited}
        ORDER BY
	        Albums.date DESC
      `
    )
    .all();
});

interface Images {
  creationDate: string;
  height: number;
  id: number;
  name: string;
  path: string;
  width: number;
}

export const getAlbum = (relativePath: string): Images[] => {
  console.log("[getAlbum]", relativePath);
  return digikam
    .prepare<[], Images>(
      `
      SELECT
        *
      FROM
        Albums
        INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        INNER JOIN Images ON Images.album = Albums.id
        LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
        LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
        LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
      WHERE
        Albums.relativePath LIKE '%${relativePath}%' AND
        ${rootAlbumEqualsEdited}
      ORDER BY
        Albums.date DESC
      `
    )
    .all();
};
