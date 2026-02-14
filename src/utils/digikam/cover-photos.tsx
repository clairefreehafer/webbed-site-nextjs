import logger from "../logger";
import { AlbumCaptionJson } from "./albums";
import { Image } from "./images";
import { createImageFile, digikam, getTagImages } from "./index";

type DigikamCoverPhoto = {
  albumCollection: string;
  albumSlug: string;
  height: number;
  id: number;
  name: string;
  path: string;
  width: number;
};

export type CoverPhoto = Pick<
  Image,
  "height" | "id" | "src" | "width" | "filename"
> & {
  position?: AlbumCaptionJson["coverPhotoPosition"];
};

export async function transformDigikamCoverPhoto({
  albumSlug,
  name,
  path,
  ...digikamCoverPhoto
}: DigikamCoverPhoto): Promise<CoverPhoto> {
  const nameWithoutExtension = name.split(".")[0];
  const transformedCoverPhoto: CoverPhoto = {
    ...digikamCoverPhoto,
    filename: nameWithoutExtension,
    src: `/out/${albumSlug}/${nameWithoutExtension}.webp`,
  };

  await createImageFile(path, transformedCoverPhoto.src);

  return transformedCoverPhoto;
}

/** get data for a the cover photo for a collection using the cover photo's filename. */
export const getCollectionCoverPhoto = async (
  tag: string,
  imageName?: string,
): Promise<CoverPhoto> => {
  if (imageName) {
    const image = digikam
      .prepare<{ imageNameLikeString: string }, DigikamCoverPhoto>(
        `
          SELECT
            ImageInformation.height,
            Images.id,
            Images.name,
            thumbs.FilePaths.path,
            ImageInformation.width,
            Albums.collection AS albumCollection,
            trim(Albums.relativePath, '/') AS albumSlug
          FROM Albums
            INNER JOIN AlbumRoots ON Albums.albumRoot = AlbumRoots.id
            INNER JOIN Images ON Images.album = Albums.id
            LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
            LEFT JOIN ImageComments on Images.id = ImageComments.imageId
            LEFT JOIN thumbs.UniqueHashes ON Images.uniqueHash = thumbs.UniqueHashes.uniqueHash
            LEFT JOIN thumbs.FilePaths ON thumbs.UniqueHashes.thumbId = thumbs.FilePaths.thumbId
          WHERE Albums.albumRoot = 4
            AND Images.name LIKE $imageNameLikeString
        `,
      )
      .get({
        imageNameLikeString: `%${imageName}%`,
      });
    if (image) {
      const transformedImage = await transformDigikamCoverPhoto(image);
      return transformedImage;
    }
    logger.warn(
      `❌ [getCollectionCoverPhoto] no collection cover photo found with name ${imageName}`,
    );
  }
  return (await getTagImages(tag))[0];
};
