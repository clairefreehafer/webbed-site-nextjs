"use client";

import { PhotoFormState, createPhoto } from "../actions";
import AdminForm, { Input, Label } from "@components/admin/form";

const initialState: Partial<PhotoFormState> = {};

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