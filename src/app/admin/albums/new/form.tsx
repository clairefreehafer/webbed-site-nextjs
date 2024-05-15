"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { AlbumFormState, createAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";

const initialState: Partial<AlbumFormState> = {};

export default function NewAlbumForm(
  { sections }: { sections: string[][] }
) {

  return (
    <AdminForm action={createAlbum} initialState={initialState}>
      <Label>
        name
        <Input type="text" name="album" required />
      </Label>

      <SectionSelect sections={sections} defaultValue={[]} />

      <button type="submit">create album</button>
    </AdminForm>
  )
}
