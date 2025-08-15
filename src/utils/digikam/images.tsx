import { type Palette } from "@vibrant/color";
import fs from "fs";
import { Vibrant } from "node-vibrant/node";
import sharp from "sharp";

import { digikam } from "./index";

/** fields returned from querying the digikam db. */
export interface DigikamImage {
  /** Albums.collection */
  albumCollection: string;
  /** Albums.slug */
  albumSlug: string;
  /** where custom metadata is stored. */
  caption: string | null;
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  creationDate: string;
  name: string;
  height: number;
  id: number;
  path: string;
  title: string | null;
  width: number;
}

/** custom JSON format for extra info stored in the image caption/comment field. */
interface ImageCaptionJson {
  altText?: string;
  border?: React.CSSProperties["border"];
  background?: React.CSSProperties["background"];
  /** animal crossing */
  showDate?: boolean;
}

/** transformed image data for use on the site. */
export interface Image extends ImageCaptionJson {
  id: DigikamImage["id"];
  /** YYYY-MM-DDTHH:MM:SS.SSS */
  dateTaken: DigikamImage["creationDate"];
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

export async function transformDigikamImage(
  digikamImage: DigikamImage,
  options: ImageOptions = { resize: 1000, generatePalette: false }
): Promise<Image> {
  const nameWithoutExtension = digikamImage.name.split(".")[0];
  let transformedImage: Image = {
    id: digikamImage.id,
    filename: nameWithoutExtension,
    height: digikamImage.height,
    src: `/out/${digikamImage.albumCollection}/${digikamImage.albumSlug}/${nameWithoutExtension}.webp`,
    width: digikamImage.width,
    title: digikamImage.title,
    dateTaken: digikamImage.creationDate,
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
        .resize({ width: options.resize, withoutEnlargement: true })
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

export const getAlbumImages = async (
  relativePath: string,
  collection = "photography",
  options: ImageOptions = { resize: 1000, generatePalette: false }
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<
      { relativePath: string; collectionLikeString: string },
      DigikamImage
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
          Albums.collection AS albumCollection,
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
          AND Albums.albumRoot = 4
          AND Albums.collection LIKE $collectionLikeString
        GROUP BY Images.id
          ORDER BY Images.name ASC
      `
    )
    .all({
      relativePath: `/${relativePath}`,
      collectionLikeString: `%${collection}%`,
    });
  console.log(
    `📷 [getAlbumImages] ${digikamImages.length} images found in "${collection}/${relativePath}"`
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
    .prepare<{ likeString: string }, DigikamImage>(
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
          ImageTitle.comment AS title,
          ImageCaption.comment AS caption,
          Albums.collection AS albumCollection,
          ImageInformation.height,
          ImageInformation.width,
          thumbs.FilePaths.path,
          trim(Albums.relativePath, '/') AS albumSlug
        FROM Albums
          INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
          INNER JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
          LEFT JOIN ImageTitle ON Images.id = ImageTitle.imageId
          LEFT JOIN ImageCaption ON Images.id = ImageCaption.imageId
          LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
          LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
        WHERE Albums.albumRoot = 4
          AND ImageInformation.creationDate LIKE $likeString
          AND Albums.collection = 'photography'
        -- oldest images first
        ORDER BY Images.name ASC
      `
    )
    .all({
      likeString: `%${month}-${day}%`,
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
