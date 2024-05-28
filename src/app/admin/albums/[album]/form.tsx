"use client";

import AdminForm, { FormState, Input, Label } from "@components/admin/form";
import { Prisma } from "@prisma/client";
import { AlbumTypes, displayName } from "@utils/albums";
import { editAlbum } from "@actions/album";
import { ReactNode, useState } from "react";
import SelectCoverPhoto from "@components/photography/select-cover-photo";
import { getAlbum, getPhotosWithTag } from "@utils/prisma";
import SubmitButton from "@components/admin/submit-button";

type Props = {
  albumData: Prisma.PromiseReturnType<typeof getAlbum>,
  albumPhotos:
    Prisma.PromiseReturnType<typeof getAlbum>["photos"] |
    Prisma.PromiseReturnType<typeof getPhotosWithTag>,
  children: ReactNode,
};

export type UpdateAlbumFormState = FormState<
  Props["albumPhotos"]
>;

export default function UpdateAlbumForm(
  { albumData, albumPhotos, children }: Props) {
  const [autoDateGeneration, setAutoDateGeneration] = useState(!!albumPhotos.length);

  const initialState: UpdateAlbumFormState = {};

  const { id, name, date, type, coverKey } = albumData;

  return (
    <AdminForm action={editAlbum} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <Label htmlFor="name">
        name
      </Label>
      <Input
        type="text"
        name="name"
        id="name"
        defaultValue={displayName(name)}
      />

      {children}

      <Label htmlFor="type">
        type
      </Label>
      <Input as="select" name="type" id="type" defaultValue={type}>
        {Object.values(AlbumTypes).map((type) => (
          <option key={type}>{type}</option>
        ))}
      </Input>

      <Label htmlFor="date">
        date
      </Label>
      <div>
        <Input
          type="datetime-local"
          name="date"
          defaultValue={date?.toISOString()}
          readOnly={autoDateGeneration}
        />

        <Label>
          generate date automatically?
          <Input
            type="checkbox"
            checked={autoDateGeneration}
            name="generateDateAutomatically"
            onChange={(e) => setAutoDateGeneration(e.target.checked)}
          />
        </Label>
      </div>

      <SelectCoverPhoto
        coverKey={coverKey}
        albumPhotos={albumPhotos}
      />

      {/* <Label>
        add photos (by smugmugkey?)
      </Label> */}

      <SubmitButton>update album</SubmitButton>
    </AdminForm>
  )
}