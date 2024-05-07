"use client";

import AdminForm, { Input, Label } from "@components/admin/form";
import { AlbumFormState, createAlbum } from "@actions/album";
import SectionSelect from "@components/admin/section-select";
import { AlbumSections } from "@utils/albums";

const initialState: Partial<AlbumFormState> = {};

export default function AdminAlbum() {
  return (
    <AdminForm action={createAlbum} initialState={initialState}>
      <Label>
        name
        <Input type="text" name="album" required />
      </Label>

      <SectionSelect defaultValue={AlbumSections.Photography} />

      <button type="submit">create album</button>
    </AdminForm>
  )
}
