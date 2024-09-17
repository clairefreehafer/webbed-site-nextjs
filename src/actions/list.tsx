"use server";

import { AdminFormState } from "@components/admin/form";
import { List, Prisma } from "@prisma/client";
import { createList, updateList } from "@utils/prisma/lists";
import { revalidatePath } from "next/cache";

export type ListFormState = AdminFormState<List>;

export async function addList(_prevState: ListFormState, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const data: Prisma.ListCreateArgs["data"] = { name, description };

  try {
    console.log(`👉 creating list ${name}...`);
    const createdList = await createList({ data });

    return {
      ...createdList,
      message: "👍 list created successfully",
    };
  } catch (error) {
    return { ...data, message: `👎 ${(error as Error).message}` };
  }
}

export async function editList(prevState: ListFormState, formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  let data: Prisma.ListUpdateArgs["data"] = {};

  try {
    if (prevState.name !== name) {
      console.log(`👉 changing name from ${prevState.name} to ${name}...`);
      data.name = name;
    }
    if (prevState.description !== description) {
      console.log(
        `👉 changing description from ${prevState.description} to ${description}...`
      );
      data.description = description;
    }

    const updatedList = await updateList({ where: { id }, data });

    revalidatePath("/admin");

    return {
      ...updatedList,
      message: `👍 list ${name} updated successfully.`,
    };
  } catch (error) {
    return {
      message: `👎 ${(error as Error).message}`,
    };
  }
}
