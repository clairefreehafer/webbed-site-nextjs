import { Photo } from "@prisma/client";

type SmugMugPhotoSizes =
  "Ti" |
  "Th" |
  "S"  |
  "M"  |
  "L"  |
  "XL" |
  "X2" |
  "X3" |
  "X4" |
  "X5";

export function sizePhoto(url: Photo["url"], size: SmugMugPhotoSizes) {
  return url?.replaceAll("#size#", size);
}