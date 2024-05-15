"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { Album } from "@prisma/client";
import { AlbumTypes, displayName } from "@utils/albums";
import { AlbumFormState, updateAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";
import { useState } from "react";

export default function UpdateAlbumForm(
  { albumData, sections }: { albumData: Album, sections: string[][] }) {
  const [autoDateGeneration, setAutoDateGeneration] = useState(true);

  if (!albumData) {
    return <>❌ missing album data!</>;
  }

  const initialState: AlbumFormState = {
    ...albumData,
    message: "",
  };

  const { id, name, section, date, type } = albumData;

  return (
    <AdminForm action={updateAlbum} initialState={initialState}>
      <Label>
        id
        <Input type="number" name="id" defaultValue={id} readOnly />
      </Label>

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

      {/* <Label>
        add photos (by smugmugkey?)
      </Label> */}

      <button type="submit">update album</button>
    </AdminForm>
  )
}