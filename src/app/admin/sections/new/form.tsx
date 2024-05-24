"use client";

import { addSection } from "@actions/section";
import AdminForm, { Input, Label } from "@components/admin/form";
import ParentSectionSelect from "@components/admin/parent-section-select";
import SubmitButton from "@components/admin/submit-button";
import { Section } from "@prisma/client";

export default function NewSectionForm(
  { sections }: { sections: Section[] }
) {
  return (
    <AdminForm action={addSection} initialState={{}}>
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