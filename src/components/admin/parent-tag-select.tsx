import { PrismaClient } from "@prisma/client"
import { Input, Label } from "./form";

const prisma = new PrismaClient();

export async function ParentTagSelect(
  { defaultValue }: { defaultValue?: string }
) {
  // const parentTags = await prisma.tag.findMany({
  //   distinct: "parent",
  //   select: { parent: true }
  // });
  // const parents = parentTags
  //   .filter((tag) => tag.parent)
  //   .map((tag) => (tag.parent && tag.parent));

  // console.log(parentTags)

  return (
    <Label>
      parent tag
      {/* <select name="parent" defaultValue={defaultValue}>
        {parents.map((parent) => (
          <option key={parent}>{parent}</option>
        ))}
      </select>
      <Input type="text" name="newParent" /> */}
    </Label>
  )
}