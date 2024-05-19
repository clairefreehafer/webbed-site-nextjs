"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { Album, Photo } from "@prisma/client";
import { AlbumTypes, displayName } from "@utils/albums";
import { AlbumFormState, editAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";
import { useState } from "react";
import SelectCoverPhoto from "@components/photography/select-cover-photo";

export default function UpdateAlbumForm(
  { albumData, albumPhotos, sections }: { albumData: Album, albumPhotos: Photo[], sections: string[][] }) {
  const [autoDateGeneration, setAutoDateGeneration] = useState(!!albumPhotos.length);

  const initialState: AlbumFormState = {
    ...albumData,
    message: "",
  };

  const { id, name, section, date, type, coverKey } = albumData;

  return (
    <AdminForm action={editAlbum} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <Label>
        name
        <Input
          type="text"
          name="name"
          defaultValue={displayName(name)}
        />
      </Label>

      <SectionSelect defaultValue={section} sections={sections} />

      <Label>
        type
        <Input as="select" name="type" defaultValue={type}>
          {Object.values(AlbumTypes).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Input>
      </Label>

      <Label>
        date
        <Input
          type="datetime-local"
          name="date"
          defaultValue={date?.toISOString()}
          readOnly={autoDateGeneration}
        />
      </Label>

      <Label>
        generate date automatically?
        <Input
          type="checkbox"
          checked={autoDateGeneration}
          name="generateDateAutomatically"
          onChange={(e) => setAutoDateGeneration(e.target.checked)}
        />
      </Label>

      <SelectCoverPhoto
        coverKey={coverKey}
        albumPhotos={albumPhotos}
      />

      {/* <Label>
        add photos (by smugmugkey?)
      </Label> */}

      <button type="submit">update album</button>
    </AdminForm>
  )
}