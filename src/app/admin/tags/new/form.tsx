"use client";

import { TagFormState, addTag } from "@actions/tag";
import AdminForm, { Input, Label } from "@components/admin/form";
import SubmitButton from "@components/admin/submit-button";
import { Prisma } from "@prisma/client";
import { ReactNode } from "react";

const initialState: Partial<TagFormState<Prisma.TagCreateArgs["data"]>> = {};

type Props = {
  children: ReactNode
};

export default function AddTagForm({ children }: Props) {
  return (
    <AdminForm action={addTag} initialState={initialState}>
      <Label htmlFor="name">
        name
      </Label>
      <Input type="text" name="name" id="name" required />

      {children}

      <SubmitButton>create tag</SubmitButton>
    </AdminForm>
  )
}