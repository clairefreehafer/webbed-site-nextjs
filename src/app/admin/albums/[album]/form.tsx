"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { Prisma } from "@prisma/client";
import { AlbumTypes, displayName } from "@utils/albums";
import { AlbumFormState, editAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";
import { useState } from "react";
import SelectCoverPhoto from "@components/photography/select-cover-photo";
import { getSections } from "@utils/prisma/section";
import { getAlbum, getPhotosWithTag } from "@utils/prisma";

type Props = {
  albumData: Prisma.PromiseReturnType<typeof getAlbum>,
  albumPhotos: 
    Prisma.PromiseReturnType<typeof getAlbum>["photos"] |
    Prisma.PromiseReturnType<typeof getPhotosWithTag>,
  sections: Prisma.PromiseReturnType<typeof getSections>,
}

export default function UpdateAlbumForm(
  { albumData, albumPhotos, sections }: Props) {
  const [autoDateGeneration, setAutoDateGeneration] = useState(!!albumPhotos.length);

  const initialState: AlbumFormState = {
    ...albumData,
    message: "",
  };

  const { id, name, section, date, type, coverKey } = albumData;

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

      <SectionSelect defaultValue={section} sections={sections} />

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

      <button type="submit" css={{ gridColumnStart: "span 2" }}>update album</button>
    </AdminForm>
  )
}