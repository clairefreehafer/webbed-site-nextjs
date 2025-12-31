import { cache } from "react";

import { CoverPhoto, transformDigikamCoverPhoto } from "./cover-photos";
import { digikam, Image } from "./index";

/** fields returned from querying the digikam database. */
interface DigikamAlbum {
  caption: string | null;
  collection: string;
  /** YYYY-MM-DD */
  date: string;
  /** trimmed relativePath */
  slug: string;

  coverPhotoId: number | null;
  coverPhotoPath: string | null;
  coverPhotoFilename: string | null;
  coverPhotoHeight: number | null;
  coverPhotoWidth: number | null;
}

/** custom JSON format for extra info stored in the album caption field. */
export interface AlbumCaptionJson {
  displayName?: string;
  coverPhotoPosition?: string;
  icon?: string;
  /** zelda */
  sortBy?: keyof Pick<Image, "compendiumNumber" | "title">;
}

/** transformed album data for use on the site. */
export type Album = {
  coverPhoto?: CoverPhoto;
  date?: DigikamAlbum["date"];
  displayName?: AlbumCaptionJson["displayName"];
  icon?: AlbumCaptionJson["icon"];
  slug: string;
};

async function transformDigikamAlbum(album: DigikamAlbum): Promise<Album> {
  let transformedAlbum: Album = {
    date: album.date,
    slug: album.slug,
  };

  try {
    // if the album is nested, extract the leaf folder name
    // to set as the actual slug
    const splitAlbumSlug = album.slug.split("/");
    if (album.slug.split("/").length > 1) {
      transformedAlbum.slug = splitAlbumSlug[splitAlbumSlug.length - 1];
    }
    // parse any additional album metadata from the caption
    let captionJson: AlbumCaptionJson = {};
    if (album.caption) {
      captionJson = JSON.parse(album.caption);
    }
    // add cover photo info if set
    let coverPhoto: CoverPhoto | undefined = undefined;
    if (
      album.coverPhotoId &&
      album.coverPhotoPath &&
      album.coverPhotoFilename &&
      album.coverPhotoHeight &&
      album.coverPhotoWidth
    ) {
      const transformedCoverPhoto = await transformDigikamCoverPhoto({
        albumCollection: album.collection,
        albumSlug: album.slug,
        name: album.coverPhotoFilename,
        path: album.coverPhotoPath,
        height: album.coverPhotoHeight,
        id: album.coverPhotoId,
        width: album.coverPhotoWidth,
      });
      coverPhoto = {
        ...transformedCoverPhoto,
        position: captionJson.coverPhotoPosition,
      };
    }

    transformedAlbum = {
      ...transformedAlbum,
      ...captionJson,
      coverPhoto,
    };
  } catch (error) {
    console.log(
      `❌ [getAlbums] problem generating album data for ${album.slug}:`,
      (error as Error).message
    );
  } finally {
    return transformedAlbum;
  }
}

export const getAlbums = cache(
  async (collection = "photography"): Promise<Album[]> => {
    const albums = digikam
      .prepare<
        {
          collectionLikeString: string;
        },
        DigikamAlbum
      >(
        `
          SELECT
            trim(Albums.relativePath, '/') AS slug,
            Albums.collection,
            Albums.caption,
            Albums.date,
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
          WHERE Albums.albumRoot = 4
            AND Albums.collection LIKE $collectionLikeString
            AND Albums.relativePath NOT LIKE '%/\\_%' ESCAPE '\\'
            AND Albums.relativePath != '/'
          ORDER BY Albums.date DESC
        `
      )
      .all({
        collectionLikeString: `%${collection}%`,
      });
    console.log(
      `📁 [getAlbums] ${albums.length} albums found in "${collection}".`
    );
    const transformedAlbums: Album[] = [];
    for (const album of albums) {
      const transformedAlbum = await transformDigikamAlbum(album);
      transformedAlbums.push(transformedAlbum);
    }

    return transformedAlbums;
  }
);

export const getAlbumDate = (albumSlug: string) => {
  const result = digikam
    .prepare<{ relativePath: string }, { date: string }>(
      `
        SELECT Albums.date
        FROM Albums
        WHERE Albums.relativePath = $relativePath
      `
    )
    .get({
      relativePath: `/${albumSlug}`,
    });
  return result?.date;
};
