import { writeFileSync } from "fs";
import pc from "picocolors";

import collections from "@/data/photography/collections.json";
import locationsJson from "@/data/photography/locations.json";
import technical from "@/data/photography/technical.json";
import { GeoJson, LocationConfig, TagConfig } from "@/types/photography";

import { deslugify, slugify } from "..";
import { DigikamImage, Image, transformDigikamImage } from "./images";
import { Album, digikam, getCollectionCoverPhoto } from "./index";

const tagConfigs: Record<string, TagConfig> = {
  collections,
  technical,
};

const locations: Record<string, LocationConfig> = locationsJson;

export const getTagImages = async (
  tag: string,
  collection = "photography",
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
      `,
    )
    .all({ tag, collectionLikeString: `%${collection}%` });

  const images: Image[] = [];
  for (const image of digikamImages) {
    const transformedImage = await transformDigikamImage(image);
    images.push(transformedImage);
  }
  return images;
};

export const getNumberOfTaggedImages = (
  tag: string,
  collection = "photography",
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
      `,
    )
    .get({ tag, collectionLikeString: `%${collection}%` });
  return result?.numberOfImages ?? 0;
};

export const getTagsInGroup = (group: string): string[] => {
  const tags = digikam
    .prepare<[{ group: string }], { tagName: string }>(
      `
        SELECT Tags.name as tagName
        FROM Tags
        INNER JOIN Tags as ParentTags on ParentTags.id = Tags.pid
        WHERE ParentTags.name = $group
      `,
    )
    .all({ group });

  return tags.map((tag) => tag.tagName) ?? [];
};

export const getParentTag = (tag: string): string | undefined => {
  const parentTag = digikam
    .prepare<[{ tag: string }], { name: string }>(
      `
        SELECT ParentTags.name
        FROM Tags
        INNER JOIN Tags as ParentTags on ParentTags.id = Tags.pid
        WHERE Tags.name = $tag
      `,
    )
    .get({ tag });

  return parentTag?.name;
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
          AND Albums.collection LIKE '%photography%'
        GROUP BY Tags.id
      `,
    )
    .all();

  const mapData: GeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const tag of locationTags) {
    const tagConfig = locations[tag.tagName];
    if (!tagConfig || !("coordinates" in tagConfig)) {
      console.warn(
        "🚧",
        pc.dim("[getMapData]"),
        "no or incomplete tag config for",
        pc.yellow(tag.tagName),
      );
      continue;
    }
    if (tagConfig.coordinates.length !== 2) {
      console.warn(
        "❌",
        pc.dim("[getMapData]"),
        "invalid coordinates for",
        pc.red(tag.tagName),
      );
      continue;
    }
    if (tag.numberOfImages === 0) {
      console.warn(
        "🚧",
        pc.dim("[getMapData]"),
        "no images with tag",
        pc.red(tag.tagName),
      );
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

export const generateAlbumGroupMapData = (albumGroup: string): GeoJson => {
  const mapData: GeoJson = {
    type: "FeatureCollection",
    features: [],
  };

  const tagsString = digikam
    .prepare<[{ albumGroupLikeString: string }], { locationTags: string }>(
      `
        SELECT
          group_concat(DISTINCT Tags.name) as locationTags
        FROM Albums
          LEFT JOIN Images ON Images.album = Albums.id
          LEFT JOIN ImageTags ON ImageTags.imageid = Images.id
          LEFT JOIN Tags ON ImageTags.tagid = Tags.id
        WHERE Albums.albumRoot = 4
          AND Albums.collection LIKE '%photography%'
          AND Albums.caption LIKE $albumGroupLikeString
          AND Tags.pid = 188

      `,
    )
    .get({ albumGroupLikeString: `%${albumGroup}%` });

  if (!tagsString || !tagsString.locationTags) {
    console.warn(
      "🚧",
      pc.dim("[generateAlbumGroupMapData]"),
      "no location tags found for group",
      pc.yellow(albumGroup),
    );
    return mapData;
  }

  const locationTags = tagsString.locationTags.split(",");

  for (const tag of locationTags) {
    const tagConfig = locations[tag];

    if (!tagConfig) {
      console.warn(
        "🚧",
        pc.dim("[generateMapFromTags]"),
        "missing tag config for",
        pc.yellow(tag),
      );
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
      },
    });
  }

  return mapData;
};

export const generateTagAlbums = async (
  tagGroup: "collections" | "locations" | "technical",
): Promise<Album[]> => {
  const albums: Album[] = [];
  const groupTags = getTagsInGroup(tagGroup);
  const groupTagJson = tagConfigs[tagGroup];
  if (!groupTagJson) {
    throw new Error(
      `[generateTagAlbums] no tag config for tag group "${tagGroup}"`,
    );
  }

  let shouldUpdateJson = false;

  for (const tag of groupTags) {
    let tagConfig = groupTagJson[tag];

    if (!tagConfig) {
      console.log(
        `📝 [generateTagAlbums] adding "${tag}" to ${tagGroup}.json...`,
      );
      tagConfig = {};
      groupTagJson[tag] = tagConfig;
      shouldUpdateJson = true;
    }

    const numberOfPhotos = getNumberOfTaggedImages(tag);
    if (numberOfPhotos === 0) {
      // skip if there are no photos with that tag.
      console.warn(`😢 no photos with tag "${tag}"`);
      continue;
    }

    const coverPhoto = await getCollectionCoverPhoto(
      tag,
      tagConfig.coverPhotoName,
    );

    const mappedAlbum: Album = {
      displayName: tagConfig.displayName ?? deslugify(tag),
      slug: slugify(tag),
      icon: tagConfig.icon,
      numberOfPhotos,
      // TODO: better solution here maybe.
      date: "",
      coverPhoto: {
        ...coverPhoto,
        position: tagConfig.coverPhotoPosition,
      },
      groups: [],
    };

    albums.push(mappedAlbum);
  }

  if (shouldUpdateJson) {
    writeFileSync(
      `${process.cwd()}/src/data/photography/${tagGroup}.json`,
      JSON.stringify(groupTagJson, null, 2),
    );
    console.log(
      `📝 [generateTagAlbum] updated JSON written to ${tagGroup}.json.`,
    );
  }

  return albums;
};
