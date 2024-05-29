"use client";

import { addSection } from "@actions/section";
import AdminForm, { FormState, Input, Label } from "@components/admin/form";
import ParentSectionSelect, { ParentSectionSelectProps } from "@components/admin/parent-section-select";
import SubmitButton from "@components/admin/submit-button";
import { Prisma } from "@prisma/client";

export type NewSectionFormState = FormState<Prisma.SectionCreateArgs["data"]>;

export default function NewSectionForm(
  { sections }: { sections: ParentSectionSelectProps["sections"] }
) {
  return (
    <AdminForm action={addSection} initialState={{} as NewSectionFormState}>
      <Label htmlFor="name">
        name
      </Label>
      <Input type="text" name="name" id="name" required />

      <ParentSectionSelect sections={sections} />

      {/* icon */}

      <SubmitButton>create</SubmitButton>
    </AdminForm>
  )
}