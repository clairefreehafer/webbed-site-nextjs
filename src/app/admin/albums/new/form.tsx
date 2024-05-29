"use client";

import AdminForm, { FormState, Input, Label } from "@components/admin/form";
import { AlbumFormState, addAlbum } from "@actions/album";
import SectionSelect, { SectionSelectProps } from "@components/admin/section-select";
import { AlbumTypes } from "@utils/albums";
import SubmitButton from "@components/admin/submit-button";
import { Album } from "@prisma/client";

export type NewAlbumFormState = FormState<Pick<Album, "name" | "type">>;

const initialState: NewAlbumFormState = {};

export default function NewAlbumForm(
  { sections }: { sections: SectionSelectProps["sections"] }
) {
  return (
    <AdminForm action={addAlbum} initialState={initialState}>
      <Label htmlFor="name">
        name
      </Label>
      <Input type="text" name="name" id="name" required />

      <SectionSelect sections={sections} />

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
