import Database from "better-sqlite3";
import { cache } from "react";
import { slugify } from "..";

const digikam = new Database(`${process.cwd()}/digikam4.db`, {
  readonly: true,
  fileMustExist: true,
  // verbose: console.log,
});
digikam
  .prepare(`ATTACH DATABASE '${process.cwd()}/thumbnails-digikam.db' AS thumbs`)
  .run();

const onlyEditedPhotos = "Albums.albumRoot = 4";
const oldestImagesFirst = "ORDER BY Images.name ASC";

interface DigikamAlbum {
  relativePath: string;
  caption: string;
}

interface AlbumCaptionJson {
  displayName?: string;
}

type Album = Omit<DigikamAlbum, "caption"> &
  AlbumCaptionJson & {
    slug: string;
  };

export interface DigikamImage {
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  creationDate: string;
  height: number;
  id: number;
  name: string;
  path: string;
  width: number;
}

export const getAlbums = cache((): Album[] => {
  const albums = digikam
    .prepare<[], DigikamAlbum>(
      `
        SELECT
          *
        FROM
          Albums
            INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        WHERE ${onlyEditedPhotos}
        ORDER BY
	        Albums.date DESC
      `
    )
    .all();
  console.log(`📁 [getAlbums] ${albums.length} albums found.`);
  return albums.map((album) => {
    const transformedAlbum: Album = {
      ...album,
      slug: slugify(album.relativePath.slice(1)),
    };
    try {
      let captionJson: AlbumCaptionJson = {};
      if (album.caption) {
        captionJson = JSON.parse(album.caption);
      }
      return {
        ...transformedAlbum,
        ...captionJson,
      };
    } catch (error) {
      console.log(
        `❌ problem generating album data for ${album.relativePath}:`,
        (error as Error).message
      );
    }
    return transformedAlbum;
  });
});

export const getTodaysImages = (
  month: string,
  day: string
): Record<string, DigikamImage[]> => {
  const images = digikam
    .prepare<[], DigikamImage>(
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
          ${onlyEditedPhotos} AND
          ImageInformation.creationDate LIKE '%${month}-${day}%'
        ${oldestImagesFirst}
      `
    )
    .all();
  console.log(
    `📷 [getTodaysImages] ${images.length} images found for ${month}/${day}.`
  );
  const imagesByYear: Record<string, DigikamImage[]> = {};

  for (const image of images) {
    const year = image.creationDate.slice(0, 4);
    if (imagesByYear[year]) {
      imagesByYear[year].push(image);
    } else {
      imagesByYear[year] = [image];
    }
  }

  return imagesByYear;
};

export const getAlbumImages = (relativePath: string): DigikamImage[] => {
  const images = digikam
    .prepare<[], DigikamImage>(
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
        ${onlyEditedPhotos}
      ${oldestImagesFirst}
      `
    )
    .all();
  console.log(
    `📷 [getAlbumImages] ${images.length} images found in "${relativePath}"`
  );
  return images;
};

export const getChildTags = (tag: string): string[] => {
  const tagObjects = digikam
    .prepare<[], { name: string }>(
      `
        SELECT
          t2.name
        FROM
          Tags t1
          INNER JOIN TagsTree ON t1.id = TagsTree.pid
          LEFT JOIN Tags t2 ON TagsTree.id = t2.id
        WHERE
          t1.name = '${tag}'
          AND t2.pid =(SELECT id FROM Tags WHERE Tags.name = '${tag}')
    `
    )
    .all();

  return tagObjects.map((obj) => obj.name);
};

export const getTagImages = (tag: string): DigikamImage[] => {
  const images = digikam
    .prepare<[], DigikamImage>(
      `
        SELECT
          *
        FROM
          Images
            LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
            LEFT JOIN Tags ON ImageTags.tagid = Tags.id
            LEFT JOIN Albums ON Images.album = Albums.id
            LEFT JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
            LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
            LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
            LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE
          Tags.name = '${tag}' AND
          Albums.albumRoot = 4
        `
    )
    .all();
  console.log(
    `📷 [getTagImages] ${images.length} images found tagged "${tag}".`
  );
  return images;
};
