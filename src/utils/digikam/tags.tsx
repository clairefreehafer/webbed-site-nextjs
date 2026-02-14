import { writeFileSync } from "fs";
import pc from "picocolors";

import collections from "@/data/photography/collections.json";
import locationsJson from "@/data/photography/locations.json";
import technical from "@/data/photography/technical.json";
import { GeoJson, LocationConfig, TagConfig } from "@/types/photography";

import { deslugify, slugify } from "..";
import logger from "../logger";
import {
  DigikamImage,
  Image,
  imageQueryStrings,
  transformDigikamImage,
} from "./images";
import { Album, digikam, getCollectionCoverPhoto } from "./index";

const tagConfigs: Record<string, Record<string, TagConfig>> = {
  collections,
  technical,
};

const locations: Record<string, LocationConfig> = locationsJson;

export const getTagImages = async (
  tag: string,
  collection = "photography",
): Promise<Image[]> => {
  const digikamImages = digikam
    .prepare<
      [{ tagLikeString: string; collectionLikeString: string }],
      DigikamImage
    >(
      `
        ${imageQueryStrings.selectDigikamImages()}
        HAVING tags LIKE $tagLikeString
        ORDER BY ImageInformation.creationDate DESC
      `,
    )
    .all({
      tagLikeString: `%${tag}%`,
      collectionLikeString: `%${collection}%`,
    });

  const images: Image[] = [];
  let warningLog = "";
  for (const image of digikamImages) {
    // can't figure out how to return all tags from the DB without also getting
    // substring hits, like "tree" and "birchtree". so extra level of filtering for now.
    const splitTags = image.tags?.split(",") ?? [];
    if (splitTags.includes(tag)) {
      const { log, ...transformedImage } = await transformDigikamImage(image);
      images.push(transformedImage);
      warningLog += log;
    }
  }
  if (warningLog) {
    logger.groupCollapsed(
      pc.dim("[getTagImages]"),
      `issues found for ${collection} images tagged "${pc.bold(tag)}":`,
    );
    logger.warn(warningLog);
    logger.groupEnd();
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
      logger.warn(
        "🚧",
        pc.dim("[getMapData]"),
        "no or incomplete tag config for",
        pc.yellow(tag.tagName),
      );
      continue;
    }
    if (tagConfig.coordinates.length !== 2) {
      logger.warn(
        "❌",
        pc.dim("[getMapData]"),
        "invalid coordinates for",
        pc.red(tag.tagName),
      );
      continue;
    }
    if (tag.numberOfImages === 0) {
      logger.warn(
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
        name: tagConfig.name ?? deslugify(tag.tagName),
        markerColor: tagConfig.markerColor,
        numberOfPhotos: tag.numberOfImages,
        slug: tag.tagName,
      },
    });
  }
  // sort by lattitude, low to high, so that markers stack pleasantly.
  mapData.features.sort(
    (featureA, featureB) =>
      featureB.geometry.coordinates[1] - featureA.geometry.coordinates[1],
  );
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
    logger.warn(
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
      logger.warn(
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
        name: tagConfig.name ?? deslugify(tag),
        markerColor: tagConfig.markerColor,
      },
    });
  }

  // sort by lattitude, low to high, so that markers stack pleasantly.
  mapData.features.sort(
    (featureA, featureB) =>
      featureB.geometry.coordinates[1] - featureA.geometry.coordinates[1],
  );
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
        pc.dim("[generateTagAlbums]"),
        `adding "${tag}" to ${tagGroup}.json...`,
      );
      tagConfig = {};
      groupTagJson[tag] = tagConfig;
      shouldUpdateJson = true;
    }

    const numberOfPhotos = getNumberOfTaggedImages(tag);
    if (numberOfPhotos === 0) {
      // skip if there are no photos with that tag.
      logger.warn(
        pc.dim("[generateTagAlbum]"),
        "no photos with tag:",
        pc.yellow(tag),
        "\n",
      );
      continue;
    }

    const coverPhoto = await getCollectionCoverPhoto(
      tag,
      tagConfig.coverPhotoName,
    );

    if (!tagConfig.coverPhotoName) {
      groupTagJson[tag].coverPhotoName = coverPhoto.filename;
      shouldUpdateJson = true;
    }

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
      pc.dim("[generateTagAlbum]"),
      `updated JSON written to ${tagGroup}.json.`,
    );
  }

  return albums;
};
