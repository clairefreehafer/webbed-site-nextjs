"use server";

import { Photo, Prisma, PrismaClient } from "@prisma/client";
import { getSmugMugData } from "./smugmug";
import { CreatePhotoFormState } from "./types";
import { initialState } from "./create/form";
import { UpdatePhotoFormState } from "./update/[smugMugKey]/form";
import { getMetadataFromXmp } from "@utils/xmp";

let state = initialState;
const prisma = new PrismaClient();

export async function createPhoto(_prevState: CreatePhotoFormState, formData: FormData) {
  try {
    const smugMugKey = formData.get("smugMugKey") as string;
    const path = formData.get("path") as string;
    const altText = formData.get("altText") as string;
    const album = formData.get("album") as string;

    const existingPhoto = await prisma.photo.findUnique({
      where: { smugMugKey }
    });

    if (existingPhoto) {
      throw new Error(`photo with smugmug key "${smugMugKey}" is already in the database.`);
    }

    const data = await getSmugMugData(smugMugKey);
    if (typeof data === "string") {
      throw new Error(data);
    }
    const url = data.Response.ImageSizeDetails.ImageUrlTemplate;

    const metadataFromXmp = await getMetadataFromXmp(path);

    if (typeof metadataFromXmp === "string") {
      throw new Error(metadataFromXmp);
    }
    
    state = {
      smugMugKey,
      url,
      album: { connect: { name: album } },
      captureDate: metadataFromXmp.captureDate,
      metadata: {
        ...metadataFromXmp.metadata,
        altText
      },
    };

    await prisma.photo.create({ data: state });

    return {
      ...state,
      message: "👍 photo added:"
    };
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return {
      ...state,
      message: `👎 ${(error as Error).message}`
    };
  }
}

export async function updatePhoto(prevState: UpdatePhotoFormState, formData: FormData) {
  let data: Photo | {} = {};
  // pull up metatadata to view and then update?
  // synchronize smugmug keywords?
  console.log(formData)
  console.log(prevState)
  try {
    const synchronizeWithXmps = formData.get("synchronizeWithXmp");
    const smugMugKey = formData.get("smugMugKey") as string;
    const captureDate = formData.get("captureDate") as string;
    const album = formData.get("album") as string;
    const metadata: PrismaJson.Metadata = JSON.parse(formData.get("metadata") as string);
    const { path, altText } = metadata;

    if (synchronizeWithXmps) {
      const metadata = formData.get("metadata");

      if (!metadata) {
        throw new Error("no metadata available for current image.");
      }

      if (!path) {
        throw new Error("no path value available in metadata.");
      }

      const metadataFromXmp = await getMetadataFromXmp(path);

      if (typeof metadataFromXmp === "string") {
        throw new Error(metadataFromXmp);
      }

      data = { 
        captureDate: metadataFromXmp.captureDate,
        metadata: {
          ...metadataFromXmp.metadata,
          altText,
        }
      };
      
    } else {
      data = {
        metadata,
        albumName: album,
      };
    }

    await prisma.photo.update({
      where: { smugMugKey },
      data
    });

    return {
      ...data,
      message: "👍 photo updated",
    } as UpdatePhotoFormState;
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return {
      ...data,
      message: `👎 ${(error as Error).message}`
    } as UpdatePhotoFormState;
  }
}

export async function deletePhoto() {

}
