"use client";

import { PhotoFormState, createPhoto } from "@actions/photo";
import AdminForm from "@components/admin/form/index";
import Select from "@components/admin/form/select";
import SubmitButton from "@components/admin/form/submit-button";
import TextInput from "@components/admin/form/text-input";
import Textarea from "@components/admin/form/textarea";
import { Prisma } from "@prisma/client";
import { getAlbumNames } from "@utils/prisma/album";

const initialState: Partial<PhotoFormState<Prisma.PhotoCreateArgs["data"]>> =
  {};

type Props = {
  albums: Prisma.PromiseReturnType<typeof getAlbumNames>;
};

export default function CreatePhotoForm({ albums }: Props) {
  return (
    <AdminForm action={createPhoto} initialState={initialState}>
      <TextInput label="smugmug key" name="smugmugKey" required />

      <TextInput label="xmp path" name="xmpPath" required />

      <Select
        label="ablum"
        name="album"
        options={albums.map(({ name }) => name)}
      />

      <Textarea label="alt text" name="altText" />

      <SubmitButton>📸 add photo 📸</SubmitButton>
    </AdminForm>
  );
}
