"use client";

import RadioFieldset, {
  RadioInput,
} from "@components/admin/form/radio-fieldset";
// import { Fieldset, ImageRadio, Legend } from "@components/admin/form";
import { Album, Prisma } from "@prisma/client";
import { sizePhoto } from "@utils/photo";
import { getAlbumData } from "@utils/prisma/album";
import { getPhotosWithTag } from "@utils/prisma/tag";

export type SelectCoverPhotoProps = {
  defaultValue: Album["coverKey"];
  albumPhotos:
    | Prisma.PromiseReturnType<typeof getAlbumData>["photos"]
    | Prisma.PromiseReturnType<typeof getPhotosWithTag>;
};

export default function SelectCoverPhoto({
  defaultValue,
  albumPhotos,
}: SelectCoverPhotoProps) {
  return (
    <RadioFieldset legend="cover photo">
      {albumPhotos.length === 0 ? (
        <>no photos in album</>
      ) : (
        albumPhotos.map(({ smugMugKey, url }) => (
          <RadioInput
            name="coverKey"
            value={smugMugKey}
            defaultChecked={defaultValue === smugMugKey}
            key={smugMugKey}
          >
            <img src={sizePhoto(url, "Th")} alt="" />
          </RadioInput>
        ))
      )}
    </RadioFieldset>
  );
}
