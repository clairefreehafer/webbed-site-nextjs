"use client";

import { PhotoFormState, createPhoto } from "@actions/photo";
import AdminForm, { Input, Label } from "@components/admin/form";
import { Prisma } from "@prisma/client";

const initialState: Partial<PhotoFormState<Prisma.PhotoCreateArgs["data"]>> = {};

export default function CreatePhotoForm(
  { children }: { children: React.ReactNode }
) {
  return (
    <>
      <h3>create</h3>
      <AdminForm action={createPhoto} initialState={initialState}>
        <Label>
          smug mug key
          <Input type="text" name="smugMugKey" required />
        </Label>

        <Label>
          xmp path
          <Input type="text" name="xmpPath" required />
        </Label>

        {children}

        <Label>
          alt text
          <Input as="textarea" name="altText" />
        </Label>

        {/* TODO: show table of added data */}

        <button type="submit">add photo</button>
      </AdminForm>
    </>
  )
}