"use client";

import { addIcon } from "@actions/icon";
import AdminForm, { FormState, Input, Label } from "@components/admin/form";
import SubmitButton from "@components/admin/submit-button";
import { Icon } from "@prisma/client";

export type NewIconState = FormState<Pick<Icon, "character" | "imagePath">>;

const initialState: NewIconState = {};

export default function CreateIconForm() {
  return (
    <AdminForm action={addIcon} initialState={initialState}>
      <Label htmlFor="character">
        emoji
      </Label>
      <Input type="text" name="character" id="character" />

      <Label htmlFor="imagePath">
        image path
      </Label>
      <Input type="text" name="imagePath" id="imagePath" />

      <SubmitButton>add icon</SubmitButton>
    </AdminForm>
  )
}