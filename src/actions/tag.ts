"use server";

import { PrismaClient, Tag } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type TagFormState = Tag & { message?: string };

const prisma = new PrismaClient();

export async function updateTag(
  prevState: Partial<TagFormState>,
  formData: FormData
) {
  let data: Partial<TagFormState> = {};
  try {
    const name = formData.get("tag") as string;
    const parent = formData.get("parent") as string;

    data = { name, parentName: parent };

    await prisma.tag.update({
      where: { name },
      data
    })
    return {
      ...data,
      message: "👍 tag updated"
    }
  } catch (error) {
    console.error(error);
    return {
      ...data,
      message: `👎 ${(error as Error).message}`
    }
  }
}

export async function deleteTag(formData: FormData) {
  const name = formData.get("value") as string;
  
  console.log(`👉 deleting tag "${name}"...`)
  // return await new Promise((resolve) => setTimeout(resolve, 5000));
  await prisma.tag.delete({
    where: { name }
  });

  // revalidatePath("/admin/tags");
}