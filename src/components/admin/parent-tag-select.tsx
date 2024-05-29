"use client";

import { Prisma, Tag } from "@prisma/client";
import { Input, Label } from "./form";
import { getTagNames } from "@utils/prisma/tag";

type ParentTagSelectProps = {
  defaultValue?: Tag["parentName"],
  tags: Prisma.PromiseReturnType<typeof getTagNames>
};

export default function ParentTagSelect(
  { defaultValue, tags }: ParentTagSelectProps
) {
  return (
    <>
      <Label htmlFor="parentName">
        parent tag
      </Label>
      <Input as="select" name="parentName" id="parentName" defaultValue={defaultValue || "(none)"}>
        <option>(none)</option>
        {tags.map(({ name }) => (
          <option key={name}>{name}</option>
        ))}
      </Input>
    </>
  )
}