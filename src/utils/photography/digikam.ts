import Database from "better-sqlite3";
import { cache } from "react";
import { getImageSrc, slugify } from "..";

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

/** fields returned from querying the digikam db. */
interface DigikamAlbum {
  relativePath: string;
  caption: string;
}

/** custom JSON format for extra info stored in the caption field. */
interface AlbumCaptionJson {
  displayName?: string;
}

/** transformed album data for use on the site. */
type Album = Omit<DigikamAlbum, "caption"> &
  AlbumCaptionJson & {
    slug: string;
  };

/** fields returned from querying the digikam db. */
interface DigikamImage {
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  creationDate: string;
  height: number;
  id: number;
  name: string;
  path: string;
  width: number;
}

/** transformed image data for use on the site. */
export interface Image {
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  dateTaken: DigikamImage["creationDate"];
  filename: DigikamImage["name"];
  height: DigikamImage["height"];
  src: string;
  width: DigikamImage["width"];
}

async function transformDigikamImage(digikamImage: DigikamImage) {
  const src = await getImageSrc(digikamImage.path);
  return {
    dateTaken: digikamImage.creationDate,
    filename: digikamImage.name,
    height: digikamImage.height,
    src,
    width: digikamImage.width,
  };
}

export const getAlbums = cache((): Album[] => {
  const albums = digikam
    .prepare<[], DigikamAlbum>(
      `
        SELECT *
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        WHERE ${onlyEditedPhotos}
        ORDER BY Albums.date DESC
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
        `❌ [getAlbums] problem generating album data for ${album.relativePath}:`,
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
        SELECT *
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE ${onlyEditedPhotos}
          AND ImageInformation.creationDate LIKE '%${month}-${day}%'
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

export const getAlbumImages = async (
  relativePath: string
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<[], DigikamImage>(
      `
        SELECT *
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Albums.relativePath LIKE '%${relativePath}%'
          AND ${onlyEditedPhotos}
        ${oldestImagesFirst}
      `
    )
    .all();
  console.log(
    `📷 [getAlbumImages] ${digikamImages.length} images found in "${relativePath}"`
  );
  const images: Image[] = [];
  for (const image of digikamImages) {
    const transformedImage = await transformDigikamImage(image);
    images.push(transformedImage);
  }
  return images;
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
