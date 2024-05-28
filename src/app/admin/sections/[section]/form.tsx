"use client";

import { editSection } from "@actions/section";
import AdminForm, { FormState, Input, Label } from "@components/admin/form";
import ParentSectionSelect from "@components/admin/parent-section-select";
import { Prisma } from "@prisma/client";
import { getSection, getSections } from "@utils/prisma/section";

type Props = {
  sectionData: Prisma.PromiseReturnType<typeof getSection>,
  sections: Prisma.PromiseReturnType<typeof getSections>
};

export type UpdateSectionFormState = FormState<Props["sectionData"]>

export default function UpdateSectionForm(
  { sectionData, sections }: Props
) {
  const { id, name, parentName } = sectionData;

  return (
    <AdminForm action={editSection} initialState={sectionData as UpdateSectionFormState}>
      <input type="hidden" name="id" value={id} />
      <Label>
        name
        <Input type="text" name="name" defaultValue={name} />
      </Label>

      <ParentSectionSelect
        sections={sections}
        defaultValue={parentName || undefined}
      />

      <button type="submit">update section</button>
    </AdminForm>
  )
}