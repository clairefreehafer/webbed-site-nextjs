"use client";

import { addSection } from "@actions/section";
import AdminForm, { AdminFormState } from "@components/admin/form/index";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
import { Prisma } from "@prisma/client";
import { ReactNode } from "react";

export type NewSectionFormState = AdminFormState<
  Prisma.SectionCreateArgs["data"]
>;

type Props = {
  parentSectionSelect: ReactNode;
};

export default function NewSectionForm({ parentSectionSelect }: Props) {
  return (
    <AdminForm action={addSection} initialState={{} as NewSectionFormState}>
      <TextInput label="name" name="name" required />

      {parentSectionSelect}

      {/* icon */}

      <SubmitButton>create</SubmitButton>
    </AdminForm>
  );
}
