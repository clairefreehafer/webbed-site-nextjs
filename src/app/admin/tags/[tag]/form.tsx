import AdminForm, { FormState, Input, Label } from "@components/admin/form";
import { editTag } from "@actions/tag";
import { Prisma, Tag } from "@prisma/client";
import { ReactNode } from "react";
import SubmitButton from "@components/admin/submit-button";
import { getTag } from "@utils/prisma";

type Props = {
  tagData: Tag,
  children: ReactNode
};

export type UpdateTagFormState = FormState<Prisma.PromiseReturnType<typeof getTag>>;

export default async function TagForm(
  { tagData, children }: Props
) {
  const initialState = tagData as UpdateTagFormState;

  return (
    <AdminForm action={editTag} initialState={initialState}>
      <Label htmlFor="name">
        name
      </Label>
      <Input type="text" name="name" defaultValue={tagData.name} />

      {children}

      <SubmitButton>update tag</SubmitButton>
    </AdminForm>
  );
}