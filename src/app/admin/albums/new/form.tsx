"use client";

import { addAlbum } from "@actions/album";
import SectionSelect, {
  SectionSelectProps,
} from "@components/admin/form/SectionSelect";
import { AlbumTypes } from "@utils/album";
import SubmitButton from "@components/admin/form/SubmitButton";
import { Album } from "@prisma/client";
import AdminForm from "@components/admin/form/index";
import { FormState } from "@components/admin/form/index";
import TextInput from "@components/admin/form/TextInput";
import Select from "@components/admin/form/Select";

export type NewAlbumFormState = FormState<Pick<Album, "name" | "type">>;

const initialState: NewAlbumFormState = {};

export default function NewAlbumForm({
  sections,
}: {
  sections: SectionSelectProps["sections"];
}) {
  return (
    <AdminForm action={addAlbum} initialState={initialState}>
      <TextInput name="name" label="name" required />

      <SectionSelect sections={sections} />

      <Select label="type" name="type" options={Object.values(AlbumTypes)} />

      <SubmitButton>create album</SubmitButton>
    </AdminForm>
  );
}
