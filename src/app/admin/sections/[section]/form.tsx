"use client";

import { editSection } from "@actions/section";
import AdminForm, { Input, Label } from "@components/admin/form";
import ParentSectionSelect from "@components/admin/parent-section-select";
import { Section } from "@prisma/client";

export default function UpdateSectionForm(
  { sectionData, sections }: { sectionData: Section, sections: Section[] }
) {
  const { id, name } = sectionData;

  return (
    <AdminForm action={editSection} initialState={sectionData}>
      <input type="hidden" name="id" value={id} />
      <Label>
        name
        <Input type="text" name="name" defaultValue={name} />
      </Label>

      <ParentSectionSelect
        sections={sections}
        defaultValue={sectionData.parentName || undefined}
      />

      <button type="submit">update section</button>
    </AdminForm>
  )
}