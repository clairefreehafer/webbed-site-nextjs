import Database from "better-sqlite3";
import { cache } from "react";
import { slugify } from ".";
import fs from "fs";
import sharp from "sharp";
import { Vibrant } from "node-vibrant/node";
import { type Palette } from "@vibrant/color";
import { GeoJson } from "./types";
import locations from "@/data/locations.json";

const digikam = new Database(`${process.cwd()}/local/digikam4.db`, {
  readonly: true,
  fileMustExist: true,
  // verbose: console.log,
});
digikam
  .prepare(
    `ATTACH DATABASE '${process.cwd()}/local/thumbnails-digikam.db' AS thumbs`
  )
  .run();

const oldestImagesFirst = "Images.name ASC";
const websiteRootAlbumId = 4;

/** custom JSON format for extra info stored in the album caption field. */
interface AlbumCaptionJson {
  displayName?: string;
  coverPhotoPosition?: string;
}

/** custom JSON format for extra info stored in the image caption/comment field. */
interface ImageCommentJson {
  altText?: string;
  border?: React.CSSProperties["border"];
  background?: React.CSSProperties["background"];
}

type CoverPhoto = Pick<Image, "height" | "src" | "width"> & {
  position?: AlbumCaptionJson["coverPhotoPosition"];
};
/** transformed album data for use on the site. */
export type Album = {
  displayName?: AlbumCaptionJson["displayName"];
  slug: string;
  coverPhoto?: CoverPhoto;
};

/** fields returned from querying the digikam db. */
interface DigikamImage {
  id: number;
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  creationDate?: string;
  // Albums.collection
  collection: string;
  height?: number;
  name: string;
  path: string;
  // Albums.relativePath
  albumSlug?: string;
  width: number;
  title?: string | null;
  caption?: string | null;
}

/** transformed image data for use on the site. */
export interface Image extends ImageCommentJson {
  id: number;
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  dateTaken?: DigikamImage["creationDate"];
  filename: DigikamImage["name"];
  height: DigikamImage["height"];
  width: DigikamImage["width"];
  src: string;
  palette?: Palette;
  title?: DigikamImage["title"];
}

interface ImageOptions {
  resize?: number;
  generatePalette?: boolean;
}

async function transformDigikamImage(
  digikamImage: DigikamImage,
  options: ImageOptions = { resize: 1000, generatePalette: false }
): Promise<Image> {
  const nameWithoutExtension = digikamImage.name.split(".")[0];
  let transformedImage: Image = {
    id: digikamImage.id,
    filename: nameWithoutExtension,
    height: digikamImage.height,
    src: `/out/${digikamImage.collection}/${digikamImage.albumSlug}/${nameWithoutExtension}.webp`,
    width: digikamImage.width,
    title: digikamImage.title,
  };
  try {
    const outputPath = `${process.cwd()}/public${transformedImage.src}`;
    const outputPathSplit = outputPath.split("/");
    const outputDirectory = outputPathSplit
      .slice(0, outputPathSplit.length - 1)
      .join("/");
    const buffer = fs.readFileSync(digikamImage.path);

    // only transform image if it doesn't already exist.
    if (!fs.existsSync(outputPath)) {
      // create output directories if needed
      if (!fs.existsSync(outputDirectory)) {
        console.log(
          `📝 [transformDigikamImage] creating directory ${outputDirectory}...`
        );
        fs.mkdirSync(outputDirectory, { recursive: true });
      }
      console.log(`📝 [transformDigikamImage] creating image ${outputPath}...`);
      // transform image
      await sharp(buffer, { animated: true })
        .resize(options.resize)
        .webp({ quality: 100 })
        .toFile(outputPath);
    }
    if (digikamImage.creationDate) {
      transformedImage = {
        ...transformedImage,
        dateTaken: digikamImage.creationDate,
      };
    }
    if (digikamImage.title) {
      transformedImage = {
        ...transformedImage,
        title: digikamImage.title,
      };
    }

    // optionally generate a color palette from the image.
    if (options.generatePalette) {
      const palette = await Vibrant.from(buffer).getPalette();
      transformedImage = {
        ...transformedImage,
        palette,
      };
    }

    // check for custom metadata
    if (digikamImage.caption?.startsWith("{")) {
      const parsedCaption = JSON.parse(digikamImage.caption);

      transformedImage = {
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

export const getAlbums = cache(
  async (collection = "photography"): Promise<Album[]> => {
    const albums = digikam
      .prepare<
        {
          collectionLikeString: string;
          albumRootId: number;
        },
        {
          slug: string;
          collection: string;
          caption: string | null;
          coverPhotoPath: string | null;
          coverPhotoHeight: number | null;
          coverPhotoWidth: number | null;
          coverPhotoFilename: string | null;
          coverPhotoId: number | null;
        }
      >(
        `
          SELECT
            trim(Albums.relativePath, '/') AS slug,
            Albums.collection,
            Albums.caption,
            -- cover photo
            Thumbs.FilePaths.path AS coverPhotoPath,
            ImageInformation.height AS coverPhotoHeight,
            ImageInformation.width AS coverPhotoWidth,
            Images.name AS coverPhotoFilename,
            Images.id AS coverPhotoId
          FROM Albums
            INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
            LEFT JOIN Images ON Images.id = Albums.icon
            LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
            LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
            LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
          WHERE Albums.albumRoot = $albumRootId
            AND Albums.collection LIKE $collectionLikeString
            AND Albums.relativePath NOT LIKE '%/\\_%' ESCAPE '\\'
            AND Albums.relativePath != '/'
          ORDER BY Albums.date DESC
        `
      )
      .all({
        collectionLikeString: `%${collection}%`,
        albumRootId: websiteRootAlbumId,
      });
    console.log(
      `📁 [getAlbums] ${albums.length} albums found in "${collection}".`
    );
    const transformedAlbums: Album[] = [];
    for (const album of albums) {
      let transformedAlbum: Album = {
        slug: album.slug,
      };
      try {
        let captionJson: AlbumCaptionJson = {};
        if (album.caption) {
          captionJson = JSON.parse(album.caption);
        }
        let coverPhoto;
        if (album.coverPhotoPath) {
          const transformedCoverPhoto = await transformDigikamImage({
            albumSlug: album.slug,
            collection: album.collection,
            path: album.coverPhotoPath,
            id: album.coverPhotoId!,
            name: album.coverPhotoFilename!,
            height: album.coverPhotoHeight!,
            width: album.coverPhotoWidth!,
          });
          coverPhoto = {
            ...transformedCoverPhoto,
            ...(captionJson.coverPhotoPosition
              ? { position: captionJson.coverPhotoPosition }
              : {}),
          };
        }
        transformedAlbum = {
          ...transformedAlbum,
          ...captionJson,
          ...(coverPhoto ? { coverPhoto } : {}),
        };
      } catch (error) {
        console.log(
          `❌ [getAlbums] problem generating album data for ${album.slug}:`,
          (error as Error).message
        );
      }
      transformedAlbums.push(transformedAlbum);
    }

    return transformedAlbums;
  }
);

export const getAlbumImages = async (
  relativePath: string,
  options: ImageOptions = { resize: 1000, generatePalette: false }
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<
      { albumRootId: number; relativePath: string },
      {
        id: number;
        name: string;
        creationDate: string;
        collection: string;
        height: number;
        width: number;
        path: string;
        albumSlug: string;
        title: string | null;
        caption: string | null;
      }
    >(
      `
        WITH ImageTitle as (
          SELECT * FROM ImageComments
          WHERE ImageComments.type == 3
        ),
        ImageCaption as (
          SELECT * FROM ImageComments
          WHERE ImageComments.type == 1
        )
        SELECT
          Images.id,
          Images.name,
          ImageInformation.creationDate,
          Albums.collection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          trim(Albums.relativePath, '/') AS albumSlug,
          ImageTitle.comment as title,
          ImageCaption.comment as caption
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageTitle ON Images.id = ImageTitle.imageId
          LEFT JOIN ImageCaption ON Images.id = ImageCaption.imageId
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Albums.relativePath == $relativePath
          AND Albums.albumRoot = $albumRootId
        GROUP BY Images.id
            ORDER BY Images.name ASC
      `
    )
    .all({
      albumRootId: websiteRootAlbumId,
      relativePath: `/${relativePath}`,
    });
  console.log(
    `📷 [getAlbumImages] ${digikamImages.length} images found in "${relativePath}"`
  );
  const images: Image[] = [];
  for (const image of digikamImages) {
    const transformedImage = await transformDigikamImage(image, options);
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
      {
        id: number;
        name: string;
        creationDate: string;
        comment: string | null;
        collection: string;
        height: number;
        width: number;
        path: string;
        albumSlug: string;
      }
    >(
      `
        SELECT
          Images.id,
          Images.name,
          ImageInformation.creationDate,
          ImageComments.comment,
          Albums.collection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          trim(Albums.relativePath, '/') AS albumSlug
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageComments on Images.id = ImageComments.imageId
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
  if (digikamImages.length > 0) {
    console.log(
      `📷 [getTodaysImages] ${digikamImages.length} images found for ${month}/${day}.`
    );
  }
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
    .prepare<
      [{ tag: string; albumRootId: number }],
      {
        id: number;
        name: string;
        creationDate: string;
        collection: string;
        height: number;
        width: number;
        path: string;
        albumSlug: string;
        title: string | null;
        caption: string | null;
      }
    >(
      `
        WITH ImageTitle as (
          SELECT * FROM ImageComments
          WHERE ImageComments.type == 3
        ),
        ImageCaption as (
          SELECT * FROM ImageComments
          WHERE ImageComments.type == 1
        )
        SELECT
          Images.id,
          Images.name,
          ImageInformation.creationDate,
          Albums.collection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          trim(Albums.relativePath, '/') AS albumSlug,
          ImageTitle.comment as title,
          ImageCaption.comment as caption
        FROM Images
          LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
          LEFT JOIN Tags ON ImageTags.tagid = Tags.id
          LEFT JOIN Albums ON Images.album = Albums.id
          LEFT JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageComments on Images.id = ImageComments.imageId
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
          LEFT JOIN ImageTitle ON Images.id = ImageTitle.imageId
          LEFT JOIN ImageCaption ON Images.id = ImageCaption.imageId
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

export const getMapData = (): GeoJson => {
  const locationTags = digikam
    .prepare<[], { tagName: keyof typeof locations; numberOfImages: number }>(
      `
        SELECT
          Tags.name as tagName,
          COUNT(*) AS numberOfImages
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          LEFT JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
          LEFT JOIN Tags ON Tags.id = ImageTags.tagid
        WHERE Albums.albumRoot = 4
          AND Tags.pid = 188
        GROUP BY Tags.id
      `
    )
    .all();
  console.log(`🗺️ [getMapData] found ${locationTags.length} location tags.`);

  const mapData: GeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const tag of locationTags) {
    const tagConfig = locations[tag.tagName];
    if (!tagConfig) {
      console.log(`❌ [getMapData] no tag config for "${tag.tagName}"`);
      break;
    }
    mapData.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: tagConfig.coordinates as [number, number],
      },
      properties: {
        name: tagConfig.name,
        markerColor: tagConfig.markerColor,
        numberOfPhotos: tag.numberOfImages,
        slug: slugify(tag.tagName),
      },
    });
  }
  return mapData;
};

export const getCollectionCoverPhoto = async (
  imageId: number
): Promise<Image | void> => {
  const image = digikam
    .prepare<
      { imageId: number },
      {
        name: string;
        collection: string;
        height: number;
        width: number;
        path: string;
        albumSlug: string;
      }
    >(
      `
      SELECT
        Images.name,
        Albums.collection,
        ImageInformation.height,
        ImageInformation.width,
        thumbs.FilePaths.path,
        trim(Albums.relativePath, '/') AS albumSlug
      FROM Albums
        INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        INNER JOIN Images ON Images.album = Albums.id
        LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
        LEFT JOIN ImageComments on Images.id = ImageComments.imageId
        LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
        LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
      WHERE Albums.albumRoot = 4
        AND Images.id = $imageId
    `
    )
    .get({
      imageId,
    });

  if (!image) {
    console.log(`❌ no collection cover photo found with ID ${imageId}`);
    return undefined;
  }
  const transformedImage = await transformDigikamImage({
    ...image,
    id: imageId,
  });
  return transformedImage;
};
