import AdminForm, { Input, Label } from "@components/admin/form";
import { editTag } from "@actions/tag";
import { Tag } from "@prisma/client";
import { ReactNode } from "react";
import SubmitButton from "@components/admin/submit-button";

type Props = {
  tagData: Tag,
  children: ReactNode
};

export default async function TagForm(
  { tagData, children }: Props
) {
  const initialState = tagData;

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