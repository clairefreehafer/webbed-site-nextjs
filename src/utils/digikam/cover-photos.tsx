import { AlbumCaptionJson } from "./albums";
import { Image } from "./images";
import { createImageFile, digikam } from "./index";

type DigikamCoverPhoto = {
  albumCollection: string;
  albumSlug: string;
  height: number;
  id: number;
  name: string;
  path: string;
  width: number;
};

export type CoverPhoto = Pick<Image, "height" | "id" | "src" | "width"> & {
  position?: AlbumCaptionJson["coverPhotoPosition"];
};

export async function transformDigikamCoverPhoto({
  albumCollection,
  albumSlug,
  name,
  path,
  ...digikamCoverPhoto
}: DigikamCoverPhoto): Promise<CoverPhoto> {
  const nameWithoutExtension = name.split(".")[0];
  const transformedCoverPhoto: CoverPhoto = {
    ...digikamCoverPhoto,
    src: `/out/${albumCollection}/${albumSlug}/${nameWithoutExtension}.webp`,
  };

  await createImageFile(path, transformedCoverPhoto.src);

  return transformedCoverPhoto;
}

export const getCollectionCoverPhoto = async (
  imageId: number
): Promise<CoverPhoto | void> => {
  const image = digikam
    .prepare<{ imageId: number }, DigikamCoverPhoto>(
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
  const transformedImage = await transformDigikamCoverPhoto(image);
  return transformedImage;
};
