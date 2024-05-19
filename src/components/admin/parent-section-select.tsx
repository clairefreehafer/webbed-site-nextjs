"use client";

import { Section } from "@prisma/client";
import { Input, Label } from "./form";

export default function ParentSectionSelect(
  { sections, defaultValue }: { sections: Section[], defaultValue?: string }
) {
  return (
    <Label>
      parent section
      <Input as="select" name="parent" defaultValue={defaultValue}>
        <option>(none)</option>
        {sections.map((section) => (
          <option key={section.id}>{section.name}</option>
        ))}
      </Input>
    </Label>
  )
}