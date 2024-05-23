"use client";

import { IconFormState, addIcon } from "@actions/icon";
import AdminForm, { Input, Label } from "@components/admin/form";

const initialState: Partial<IconFormState> = {};

export default function CreateIconForm() {
  return (
    <>
      <h3>create</h3>
      <AdminForm action={addIcon} initialState={initialState}>
        <Label>
          emoji
          <Input type="text" name="character" />
        </Label>

        <Label>
          image path
          <Input type="text" name="imagePath" />
        </Label>

        <button type="submit">add icon</button>
      </AdminForm>
    </>
  )
}