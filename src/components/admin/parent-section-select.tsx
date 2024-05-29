"use client";

import { Prisma, Section } from "@prisma/client";
import { Input, Label } from "./form";
import { getParentSections } from "@utils/prisma/section";

export type ParentSectionSelectProps = {
  defaultValue?: Section["parentName"],
  sections: Prisma.PromiseReturnType<typeof getParentSections>,
};

export default function ParentSectionSelect(
  { sections, defaultValue }: ParentSectionSelectProps
) {
  return (
    <>
      <Label htmlFor="parent">
        parent section
      </Label>
      <Input as="select" name="parent" id="parent" defaultValue={defaultValue || ""}>
        <option>(none)</option>
        {sections.map((section) => (
          <option key={section.id}>{section.name}</option>
        ))}
      </Input>
    </>
  )
}