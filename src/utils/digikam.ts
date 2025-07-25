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

/** fields returned from querying the digikam db. */
interface DigikamAlbum {
  relativePath: string;
  caption: string;
}

/** custom JSON format for extra info stored in the album caption field. */
interface AlbumCaptionJson {
  displayName?: string;
}

/** custom JSON format for extra info stored in the image caption/comment field. */
interface ImageCommentJson {
  altText?: string;
  border?: React.CSSProperties["border"];
  background?: React.CSSProperties["background"];
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
  // Albums.collection
  collection: string;
  height: number;
  name: string;
  path: string;
  // Albums.relativePath
  relativePath: string;
  width: number;
}

/** transformed image data for use on the site. */
export interface Image extends ImageCommentJson {
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  dateTaken: DigikamImage["creationDate"];
  filename: DigikamImage["name"];
  height: DigikamImage["height"];
  width: DigikamImage["width"];
  src: string;
  palette?: Palette;
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
    dateTaken: digikamImage.creationDate,
    filename: nameWithoutExtension,
    height: digikamImage.height,
    src: `/out/${digikamImage.collection}${digikamImage.relativePath}/${nameWithoutExtension}.webp`,
    width: digikamImage.width,
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

    // optionally generate a color palette from the image.
    if (options.generatePalette) {
      const palette = await Vibrant.from(buffer).getPalette();
      transformedImage = {
        ...transformedImage,
        palette,
      };
    }

    // check for custom metadata
    if (digikamImage.comment?.startsWith("{")) {
      const parsedCaption = JSON.parse(digikamImage.comment);

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

export const getAlbums = cache((collection = "photography"): Album[] => {
  const albums = digikam
    .prepare<
      {
        collectionLikeString: string;
        albumRootId: number;
      },
      DigikamAlbum
    >(
      `
        SELECT
          Albums.relativePath,
          Albums.caption
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
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
  options: ImageOptions = { resize: 1000, generatePalette: false }
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<{ albumRootId: number; relativePath: string }, DigikamImage>(
      `
        SELECT
          Images.name,
          ImageInformation.creationDate,
          ImageComments.comment,
          Albums.collection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          Albums.relativePath
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageComments on Images.id = ImageComments.imageId
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Albums.relativePath == $relativePath
          AND Albums.albumRoot = $albumRootId
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
      DigikamImage
    >(
      `
        SELECT
          Images.name,
          ImageInformation.creationDate,
          ImageComments.comment,
          Albums.collection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          Albums.relativePath
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
    .prepare<[{ tag: string; albumRootId: number }], DigikamImage>(
      `
        SELECT
          Images.name,
          ImageInformation.creationDate,
          ImageComments.comment,
          Albums.collection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          Albums.relativePath
        FROM Images
          LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
          LEFT JOIN Tags ON ImageTags.tagid = Tags.id
          LEFT JOIN Albums ON Images.album = Albums.id
          LEFT JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageComments on Images.id = ImageComments.imageId
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
