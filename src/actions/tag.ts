"use server";

import { UpdateTagFormState } from "@app/admin/tags/[tag]/form";
import { Prisma, PrismaClient, Tag } from "@prisma/client";
import { createTag, updateTag } from "@utils/prisma/tag";

export type TagFormState<T> = T & { message?: string };

const prisma = new PrismaClient();

export async function addTag(
  _prevState: Partial<Prisma.TagCreateArgs["data"]>,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const parentName = formData.get("parentName") as string;
  let data: Prisma.TagCreateArgs["data"] = { name };

  try {
    if (parentName && parentName !== "(none)") {
      data.parentName = parentName;
    }

    const createdTag = await createTag(data);

    return {
      ...createdTag,
      message: "👍 tag created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      ...data,
      message: `👎 ${(error as Error).message}`,
    };
  }
}

export async function editTag(
  _prevState: UpdateTagFormState,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const parentName = formData.get("parentName") as string;
  let data: TagFormState<Prisma.TagUpdateArgs["data"]> = { name };

  try {
    if (parentName === name) {
      throw new Error("a tag cannot be its own parent.");
    }
    if (parentName !== "(none)") {
      data.parentName = parentName;
    }

    const updatedTag = await updateTag(name, data);

    return {
      ...updatedTag,
      message: "👍 tag updated",
    };
  } catch (error) {
    console.error(error);
    return {
      message: `👎 ${(error as Error).message}`,
    };
  }
}

export async function deleteTag(formData: FormData) {
  const name = formData.get("value") as string;

  console.log(`👉 deleting tag "${name}"...`);
  // return await new Promise((resolve) => setTimeout(resolve, 5000));
  await prisma.tag.delete({
    where: { name },
  });

  // revalidatePath("/admin/tags");
}
