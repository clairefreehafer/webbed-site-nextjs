"use client";

import { addSection } from "@actions/section";
import AdminForm, { Input, Label } from "@components/admin/form";
import ParentSectionSelect from "@components/admin/parent-section-select";
import { Section } from "@prisma/client";

export default function NewSectionForm(
  { sections }: { sections: Section[] }
) {
  return (
    <AdminForm action={addSection} initialState={{}}>
      <Label>
        name
        <Input type="text" name="name" />
      </Label>

      <ParentSectionSelect sections={sections} />

      {/* icon */}

      <button type="submit">create</button>
    </AdminForm>
  )
}