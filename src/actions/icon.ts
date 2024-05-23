"use server";

import { Icon, Prisma } from "@prisma/client";
import { createIcon } from "@utils/prisma/icon";

export type IconFormState = Icon & { message?: string };

export async function addIcon(_prevState: Partial<IconFormState>, formData: FormData) {
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
      if (!imagePath.endsWith(".png")) {
        throw new Error("`imagePath` does not appear to point to an image.");
      }
      console.log(`👉 creating icon with image ${imagePath}...`);
      data.imagePath = imagePath;
    }

    const createdIcon = await createIcon({ data });

    return {
      ...createdIcon,
      message: `👍 icon created successfully`
    };
  } catch (error) {
    return { message: `👎 ${(error as Error).message}` };
  }
}