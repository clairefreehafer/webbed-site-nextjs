"use client";

import { PhotoFormState, createPhoto } from "@actions/photo";
import AdminForm, { Input, Label } from "@components/admin/form";
import SubmitButton from "@components/admin/submit-button";
import { Prisma } from "@prisma/client";

const initialState: Partial<PhotoFormState<Prisma.PhotoCreateArgs["data"]>> = {};

export default function CreatePhotoForm(
  { children }: { children: React.ReactNode }
) {
  return (
    <AdminForm action={createPhoto} initialState={initialState}>
      <Label htmlFor="smugMugKey">
        smug mug key
      </Label>
      <Input type="text" name="smugMugKey" id="smugMugKey" required />

      <Label htmlFor="xmpPath">
        xmp path
      </Label>
      <Input type="text" name="xmpPath" id="xmpPath" required />

      {children}

      <Label htmlFor="altText">
        alt text
      </Label>
      <Input as="textarea" name="altText" id="altText" />

      {/* TODO: show table of added data */}

      <SubmitButton>📸 add photo 📸</SubmitButton>
    </AdminForm>
  )
}