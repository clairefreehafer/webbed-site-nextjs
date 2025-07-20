import Database from "better-sqlite3";
import { cache } from "react";
import { slugify } from ".";
import fs from "fs";
import sharp from "sharp";

const digikam = new Database(`${process.cwd()}/.local/digikam4.db`, {
  readonly: true,
  fileMustExist: true,
  // verbose: console.log,
});
digikam
  .prepare(
    `ATTACH DATABASE '${process.cwd()}/.local/thumbnails-digikam.db' AS thumbs`
  )
  .run();

const newestAlbumsFirst = "Albums.date DESC";
const oldestImagesFirst = "Images.name ASC";
const websiteRootAlbumId = 4;

/** fields returned from querying the digikam db. */
interface DigikamAlbum {
  relativePath: string;
  caption: string;
}

/** custom JSON format for extra info stored in the album caption field. */
interface AlbumCaptionJson {
  displayName?: string;
  altText?: string;
  border?: string;
}

/** custom JSON format for extra info stored in the image caption/comment field. */
interface ImageCaptionJson {
  // the witness
  puzzleColor?: string;
}

/** transformed album data for use on the site. */
type Album = Omit<DigikamAlbum, "caption"> &
  AlbumCaptionJson & {
    slug: string;
  };

/** fields returned from querying the digikam db. */
interface DigikamImage {
  /** where image caption is stored. */
  comment: string | null;
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
  puzzleColor?: ImageCaptionJson["puzzleColor"];
}

async function transformDigikamImage(
  digikamImage: DigikamImage,
  resize = 1000
): Promise<Image> {
  const transformedImage: Image = {
    dateTaken: digikamImage.creationDate,
    filename: digikamImage.name,
    height: digikamImage.height,
    src: "",
    width: digikamImage.width,
  };
  try {
    // transform image
    const buffer = fs.readFileSync(digikamImage.path);
    const base64 = (
      await sharp(buffer, { animated: true }).resize(resize).webp().toBuffer()
    ).toString("base64");
    transformedImage.src = `data:image/webp;base64,${base64}`;

    // check for custom metadata
    if (digikamImage.comment) {
      const parsedCaption = JSON.parse(digikamImage.comment);
      return {
        ...transformedImage,
        ...parsedCaption,
      };
    }
  } catch (error) {
    // fail gracefully if there is an issue
    console.log(
      `❌ [transformDigikamImage] issue transforming image data for ${
        digikamImage.path
      }: ${(error as Error).message}`
    );
  }
  return transformedImage;
}

export const getAlbums = cache((collection = "photography"): Album[] => {
  const albums = digikam
    .prepare<
      { collection: string; albumRootId: number; albumSort: string },
      DigikamAlbum
    >(
      `
        SELECT *
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        WHERE Albums.albumRoot = $albumRootId
          AND Albums.collection = $collection
          AND Albums.relativePath NOT LIKE '%/\\_%' ESCAPE '\\'
			    AND Albums.relativePath != '/'
        ORDER BY $albumSort
      `
    )
    .all({
      collection,
      albumRootId: websiteRootAlbumId,
      albumSort: newestAlbumsFirst,
    });
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

export const getAlbumImages = async (
  relativePath: string,
  resize = 1000
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<{ albumRootId: number; imageSort: string }, DigikamImage>(
      `
        SELECT *
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageComments on Images.id = ImageComments.imageId
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Albums.relativePath LIKE '%${relativePath}%'
          AND Albums.albumRoot = $albumRootId
          ORDER BY $imageSort
      `
    )
    .all({
      albumRootId: websiteRootAlbumId,
      imageSort: oldestImagesFirst,
    });
  console.log(
    `📷 [getAlbumImages] ${digikamImages.length} images found in "${relativePath}"`
  );
  const images: Image[] = [];
  for (const image of digikamImages) {
    const transformedImage = await transformDigikamImage(image, resize);
    images.push(transformedImage);
  }
  return images;
};

export const getTodaysImages = async (
  month: string,
  day: string
): Promise<Record<string, Image[]>> => {
  const digikamImages = digikam
    .prepare<
      { likeString: string; albumRootId: number; imageSort: string },
      DigikamImage
    >(
      `
        SELECT *
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Albums.albumRoot = $albumRootId
          AND ImageInformation.creationDate LIKE $likeString
          AND Albums.collection = 'photography'
        ORDER BY $imageSort
      `
    )
    .all({
      likeString: `%${month}-${day}%`,
      albumRootId: websiteRootAlbumId,
      imageSort: oldestImagesFirst,
    });
  console.log(
    `📷 [getTodaysImages] ${digikamImages.length} images found for ${month}/${day}.`
  );
  const imagesByYear: Record<string, Image[]> = {};

  for (const image of digikamImages) {
    const year = image.creationDate.slice(0, 4);
    const transformedImage = await transformDigikamImage(image);
    if (imagesByYear[year]) {
      imagesByYear[year].push(transformedImage);
    } else {
      imagesByYear[year] = [transformedImage];
    }
  }

  return imagesByYear;
};

export const getTagImages = async (tag: string): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<[{ tag: string; albumRootId: number }], DigikamImage>(
      `
        SELECT *
        FROM Images
          LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
          LEFT JOIN Tags ON ImageTags.tagid = Tags.id
          LEFT JOIN Albums ON Images.album = Albums.id
          LEFT JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Tags.name = $tag
          AND Albums.albumRoot = $albumRootId
        `
    )
    .all({ tag, albumRootId: websiteRootAlbumId });
  console.log(
    `📷 [getTagImages] ${digikamImages.length} images found tagged "${tag}".`
  );
  const images: Image[] = [];
  for (const image of digikamImages) {
    const transformedImage = await transformDigikamImage(image);
    images.push(transformedImage);
  }
  return images;
};
