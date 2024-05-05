"use server";

import { PrismaClient, Tag } from "@prisma/client";

export type TagFormState = Tag & { message?: string };

const prisma = new PrismaClient();

export async function updateTag(
  prevState: Partial<TagFormState>,
  formData: FormData
) {
  let data: Partial<TagFormState> = {};
  try {
    const tag = formData.get("tag") as string;
    const parent = formData.get("parent") as string;

    data = { tag, parent };

    await prisma.tag.update({
      where: { tag },
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