"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { AlbumFormState, addAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";
import { AlbumTypes } from "@utils/albums";
import { Prisma } from "@prisma/client";
import { getSections } from "@utils/prisma/section";

const initialState: Partial<AlbumFormState> = {};

export default function NewAlbumForm(
  { sections }: { sections: Prisma.PromiseReturnType<typeof getSections> }
) {

  return (
    <AdminForm action={addAlbum} initialState={initialState}>
      <Label>
        name
        <Input type="text" name="album" required />
      </Label>

      <SectionSelect sections={sections} defaultValue={null} />

      <Label>
        type
        <Input as="select" name="type">
          {Object.values(AlbumTypes).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Input>
      </Label>

      <button type="submit">create album</button>
    </AdminForm>
  )
}
