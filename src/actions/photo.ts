"use server";

import { Photo, PrismaClient } from "@prisma/client";
import { getSmugMugData } from "@utils/smugmug";
import { getMetadataFromXmp } from "@utils/xmp";

export type PhotoFormState = Photo & { message?: string };

const prisma = new PrismaClient();

export async function createPhoto(_prevState: Partial<PhotoFormState>, formData: FormData) {
  let data: Partial<Photo> & { smugMugKey: string } = {
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
      message: "👍 photo added:"
    };
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      ...data,
      message: `👎 ${(error as Error).message}`
    };
  }
}

export async function updatePhoto(
  prevState: Partial<PhotoFormState>,
  formData: FormData
) {
  let data: Partial<PhotoFormState> = {};

  try {
    const synchronizeWithXmps = formData.get("synchronizeWithXmp");
    const xmpPath = formData.get("xmpPath") as string;
    const smugMugKey = formData.get("smugMugKey") as string;
    const albumName = formData.get("albumName") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const altText = formData.get("altText") as string;

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
      if (prevState.title !== title) {
        console.log(`👉 changing title from "${prevState.title}" to "${title}"...`);
        data.title = title;
      }
      if (prevState.description !== description) {
        console.log(`👉 changing description from "${prevState.description}" to "${description}"...`);
        data.title = title;
      }
      if (prevState.altText !== altText) {
        console.log(`👉 changing altText from "${prevState.altText}" to "${altText}"...`);
        data.title = title;
      }
    }

    if (prevState.xmpPath !== xmpPath) {
      console.log(`👉 changing xmpPath from "${prevState.xmpPath}" to "${xmpPath}"...`);
      data.xmpPath = xmpPath;
    }

    if (prevState.albumName !== albumName) {
      data.albumName = albumName;
    }

    await prisma.photo.update({
      where: { smugMugKey },
      data
    });

    return {
      ...data,
      message: "👍 photo updated",
    };
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      ...data,
      message: `👎 ${(error as Error).message}`
    };
  }
}

export async function deletePhoto() {

}
