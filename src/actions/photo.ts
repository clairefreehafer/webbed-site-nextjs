"use server";

import { UpdatePhotoFormState } from "@app/admin/photos/[smugMugKey]/form";
import { Prisma, PrismaClient } from "@prisma/client";
import { updatePhoto } from "@utils/prisma/photo";
import { getSmugMugData } from "@utils/smugmug";
import { getMetadataFromXmp } from "@utils/xmp";

export type PhotoFormState<T> = T & { message?: string };

const prisma = new PrismaClient();

export async function createPhoto(_prevState: Partial<PhotoFormState<Prisma.PhotoCreateArgs["data"]>>, formData: FormData) {
  let data: Prisma.PhotoCreateArgs["data"] = {
    smugMugKey: "",
  };

  try {
    const smugMugKey = formData.get("smugMugKey") as string;
    const xmpPath = formData.get("xmpPath") as string;
    const altText = formData.get("altText") as string;
    const album = formData.get("album") as string;

    const existingPhoto = await prisma.photo.findUnique({
      where: { smugMugKey }
    });

    if (existingPhoto) {
      throw new Error(`photo with smugmug key "${smugMugKey}" is already in the database.`);
    }

    const smugMugData = await getSmugMugData(smugMugKey);
    if (typeof smugMugData === "string") {
      throw new Error(smugMugData);
    }
    const url = smugMugData.Response.ImageSizeDetails.ImageUrlTemplate;

    const metadataFromXmp = await getMetadataFromXmp(xmpPath);

    if (typeof metadataFromXmp === "string") {
      throw new Error(metadataFromXmp);
    }

    data = {
      smugMugKey,
      url,
      albumName: album,
      altText,
      xmpPath,
      ...metadataFromXmp,
    };

    await prisma.photo.create({ data });

    return {
      ...data,
      message: "👍 photo added"
    };
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      ...data,
      message: `👎 ${(error as Error).message}`
    };
  }
}

export async function editPhoto(
  prevState: UpdatePhotoFormState,
  formData: FormData
) {
  let data: Prisma.PhotoUpdateArgs["data"] = {};

  try {
    const albumName = formData.get("albumName") as string;
    if (prevState.albumName !== albumName) {
      console.log(`👉 moving photo from "${prevState.albumName}" to "${albumName}"...`);
      data.album = { connect: { name: albumName }};
    }

    const xmpPath = formData.get("xmpPath") as string;
    if (prevState.xmpPath !== xmpPath) {
      console.log(`👉 changing xmpPath from "${prevState.xmpPath}" to "${xmpPath}"...`);
      data.xmpPath = xmpPath;
    }

    const rootSection = formData.get("rootSection") as string;
    const synchronizeWithXmps = formData.get("synchronizeWithXmp");
    if (synchronizeWithXmps) {
      if (!xmpPath) {
        throw new Error("no xmpPath set for current image.");
      }

      if (xmpPath.slice(-3) !== "xmp") {
        throw new Error(`xmpPath "${xmpPath}" does not point to an xmp file.`);
      }

      const metadataFromXmp = await getMetadataFromXmp(xmpPath);

      if (typeof metadataFromXmp === "string") {
        throw new Error(metadataFromXmp);
      }

      data = metadataFromXmp;
    } else {
      data.metadata = prevState.metadata || {};

      const title = formData.get("title") as string;
      if (prevState.title !== title) {
        console.log(`👉 changing title from "${prevState.title}" to "${title}"...`);
        data.metadata.title = title;
      }

      const description = formData.get("description") as string;
      if (prevState.description !== description) {
        console.log(`👉 changing description from "${prevState.description}" to "${description}"...`);
        data.metadata.description = title;
      }

      const compendiumNumber = parseInt(formData.get("compendiumNumber") as string);
      if (rootSection === "zelda" && prevState.compendiumNumber !== compendiumNumber) {
        console.log(`👉 changing compendium number from "${prevState.compendiumNumber}" to "${compendiumNumber}"...`);
        data.metadata.compendiumNumber = compendiumNumber;
      }
    }

    const altText = formData.get("altText") as string;
    if (prevState.altText !== altText) {
      console.log(`👉 changing altText from "${prevState.altText}" to "${altText}"...`);
      data.altText = altText;
    }

    const iconId = parseInt(formData.get("iconId") as string);
    if (rootSection === "zelda" && prevState.iconId !== iconId) {
      console.log(`👉 changing compendium iconId from "${prevState.iconId}" to "${iconId}"...`);
      data.icon = { connect: { id: iconId }};
    }

    const smugMugKey = formData.get("smugMugKey") as string;
    const updatedPhoto = await updatePhoto(smugMugKey, data);

    return {
      ...updatedPhoto,
      message: "👍 photo updated",
    };
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      message: `👎 ${(error as Error).message}`
    };
  }
}

export async function deletePhoto() {

}
