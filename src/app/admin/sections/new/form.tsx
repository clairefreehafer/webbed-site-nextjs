"use client";

import { addSection } from "@actions/section";
import AdminForm, { FormState } from "@components/admin/form/index";
import SubmitButton from "@components/admin/form/submit-button";
import TextInput from "@components/admin/form/text-input";
import { Prisma } from "@prisma/client";
import { ReactNode } from "react";

export type NewSectionFormState = FormState<Prisma.SectionCreateArgs["data"]>;

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
