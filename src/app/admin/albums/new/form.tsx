"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { AlbumFormState, addAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";
import { AlbumTypes } from "@utils/albums";
import { Prisma } from "@prisma/client";
import { getSections } from "@utils/prisma/section";
import SubmitButton from "@components/admin/submit-button";

const initialState: Partial<AlbumFormState> = {};

export default function NewAlbumForm(
  { sections }: { sections: Prisma.PromiseReturnType<typeof getSections> }
) {

  return (
    <AdminForm action={addAlbum} initialState={initialState}>
      <Label htmlFor="album">
        name:
      </Label>
      <Input type="text" name="album" id="album" required />

      <SectionSelect sections={sections} defaultValue={null} />

      <Label htmlFor="type">
        type
      </Label>
      <Input as="select" name="type" id="type">
        {Object.values(AlbumTypes).map((type) => (
          <option key={type}>{type}</option>
        ))}
      </Input>

      <SubmitButton>create album</SubmitButton>
    </AdminForm>
  )
}
