"use client";

import { Fieldset, ImageRadio, Label, Legend } from "@components/admin/form";
import { Album, Prisma } from "@prisma/client";
import { sizePhoto } from "@utils/photo";
import { getAlbumData } from "@utils/prisma/album";
import { getPhotosWithTag } from "@utils/prisma/tag";

export type SelectCoverPhotoProps = {
  coverKey: Album["coverKey"],
  albumPhotos:
    Prisma.PromiseReturnType<typeof getAlbumData>["photos"] |
    Prisma.PromiseReturnType<typeof getPhotosWithTag>
};

export default function SelectCoverPhoto(
  { coverKey, albumPhotos }: SelectCoverPhotoProps
) {
  return (
    <Fieldset>
      <Legend>cover photo</Legend>
      {albumPhotos.length === 0 ? (
        <>no photos in album</>
      ) : (
        albumPhotos.map(({ smugMugKey, url }) => (
          <Label key={smugMugKey}>
            <ImageRadio
              type="radio"
              name="coverKey"
              value={smugMugKey}
              defaultChecked={coverKey === smugMugKey}
            />
            <img src={sizePhoto(url, "Th")} alt="" />
          </Label>
        ))
      )}
    </Fieldset>
  )
}