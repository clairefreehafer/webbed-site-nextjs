"use server";

import { UpdateIconFormState } from "@app/admin/icons/[icon]/form";
import { NewIconState } from "@app/admin/icons/new/page";
import { Prisma } from "@prisma/client";
import { createIcon, updateIcon } from "@utils/prisma/icon";
import { revalidatePath } from "next/cache";

export async function addIcon(_prevState: NewIconState, formData: FormData) {
  const character = formData.get("character") as string;
  const imagePath = formData.get("imagePath") as string;

  const data: Prisma.IconCreateArgs["data"] = {};

  try {
    if (character && imagePath) {
      throw new Error("only one of `character` and `imagePath` may be used.");
    }
    if (!character && !imagePath) {
      throw new Error("please fill out either `character` or `imagePath`");
    }

    if (character) {
      console.log(`👉 creating icon ${character}...`);
      data.character = character;
    } else if (imagePath) {
      if (!imagePath.startsWith("/images/")) {
        throw new Error("`imagePath` must start with `/images/`");
      }
      if (!imagePath.endsWith(".png") && !imagePath.endsWith(".svg")) {
        throw new Error("`imagePath` does not appear to point to an image.");
      }
      console.log(`👉 creating icon with image ${imagePath}...`);
      data.imagePath = imagePath;
    }

    const createdIcon = await createIcon({ data });

    revalidatePath("/admin");

    return {
      ...createdIcon,
      message: `👍 icon created successfully`,
    };
  } catch (error) {
    return { message: `👎 ${(error as Error).message}` };
  }
}

export async function editIcon(
  prevState: UpdateIconFormState,
  formData: FormData
) {
  try {
    let data: Prisma.IconUpdateArgs["data"] = {};

    const character = formData.get("character") as string;
    const imagePath = formData.get("imagePath") as string;

    if (prevState.character !== character) {
      console.log(
        `👉 changing character from ${prevState.character} to ${character}...`
      );
      data.character = character;
    }
    if (prevState.imagePath !== imagePath) {
      console.log(
        `👉 changing imagePath from ${prevState.imagePath} to ${imagePath}...`
      );
      data.imagePath = imagePath;
    }

    const text = formData.get("text") as string;

    if (prevState.text !== text) {
      console.log(`👉 changing text from ${prevState.text} to ${text}...`);
      data.text = text;
    }

    const id = parseInt(formData.get("id") as string);
    const updatedIcon = await updateIcon({
      where: { id },
      data,
    });

    revalidatePath("/admin");

    return {
      ...updatedIcon,
      message: "👍 icon updated successfully",
    };
  } catch (error) {
    return {
      message: `👎 ${(error as Error).message}`,
    };
  }
}
