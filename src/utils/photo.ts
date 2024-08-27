import { Photo } from "@prisma/client";
import { SmugMugPhotoSizes } from "./photography/types";

export function sizePhoto(url: Photo["url"], size: SmugMugPhotoSizes) {
  return url?.replaceAll("#size#", size) || "";
}
