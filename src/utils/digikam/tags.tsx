import locations from "@/data/photography/locations.json";
import { GeoJson } from "@/types/photography";

import { slugify } from "..";
import { DigikamImage, Image, transformDigikamImage } from "./images";
import { digikam } from "./index";

export const getTagImages = async (
  tag: string,
  collection = "photography"
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<[{ tag: string; collectionLikeString: string }], DigikamImage>(
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
          AND Albums.albumRoot = 4
          AND Albums.collection LIKE $collectionLikeString
          GROUP BY Images.id
      `
    )
    .all({ tag, collectionLikeString: `%${collection}%` });
  console.log(
    `📷 [getTagImages] ${digikamImages.length} ${collection} images found tagged "${tag}".`
  );
  const images: Image[] = [];
  for (const image of digikamImages) {
    const transformedImage = await transformDigikamImage(image);
    images.push(transformedImage);
  }
  return images;
};

export const getNumberOfTaggedImages = (
  tag: string,
  collection = "photography"
): number => {
  const result = digikam
    .prepare<
      [{ tag: string; collectionLikeString: string }],
      { numberOfImages: number }
    >(
      `
        SELECT
          count(*) AS numberOfImages
        FROM Images
          LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
          LEFT JOIN Tags ON ImageTags.tagid = Tags.id
          LEFT JOIN Albums ON Images.album = Albums.id
          LEFT JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
        WHERE Tags.name = $tag
          AND Albums.albumRoot = 4
          AND Albums.collection LIKE $collectionLikeString
      `
    )
    .get({ tag, collectionLikeString: `%${collection}%` });
  return result?.numberOfImages ?? 0;
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
  console.log(`🗺️  [getMapData] found ${locationTags.length} location tags.`);

  const mapData: GeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const tag of locationTags) {
    const tagConfig = locations[tag.tagName];
    if (!tagConfig) {
      console.warn(`❌ [getMapData] no tag config for "${tag.tagName}"`);
      continue;
    }
    if (tagConfig.coordinates.length !== 2) {
      console.warn(`❌ [getMapData] invalid coordinates for "${tag.tagName}"`);
      continue;
    }
    if (tag.numberOfImages === 0) {
      console.warn(`❌ [getMapData] no images with tag "${tag.tagName}"`);
      continue;
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
