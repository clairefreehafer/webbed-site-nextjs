"use client";

import { AlbumFormState, addAlbum } from "@actions/album";
import SectionSelect, {
  SectionSelectProps,
} from "@components/admin/form/SectionSelect";
import { AlbumTypes } from "@utils/album";
import SubmitButton from "@components/admin/form/SubmitButton";
import AdminForm from "@components/admin/form/index";
import TextInput from "@components/admin/form/TextInput";
import Select from "@components/admin/form/Select";

const initialState: AlbumFormState = {};

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
