"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";
import { getSmugMugData } from "./smugmug";
import xml2js from "xml2js";
import { CreatePhotoFormState } from "./types";
import { initialState } from "./create/page";

let state = initialState;

export async function createPhoto(_prevState: CreatePhotoFormState, formData: FormData) {
  try {
    const smugMugKey = formData.get("smugMugKey") as string;
    const path = formData.get("path") as string;
    const altText = formData.get("altText") as string;

    const prisma = new PrismaClient();

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
    
    const xmp = await readFile(`${process.env.METADATA_LOCATION}${path}.xmp`);
    const parser = new xml2js.Parser();
    const parsedXmp = await parser.parseStringPromise(xmp);

    const metadata = parsedXmp["x:xmpmeta"]["rdf:RDF"][0]["rdf:Description"][0];

    const tags = metadata["digiKam:TagsList"][0]["rdf:Seq"][0]["rdf:li"].map((tag: string) => {
      return {
        where: { tag },
        create: { tag },
      };
    });

    state = {
      smugMugKey,
      url,
      captureDate: metadata["$"]["exif:DateTimeOriginal"],
      album: "" as Prisma.AlbumCreateNestedOneWithoutPhotosInput,
      metadata: {
        title: metadata["$"]["acdsee:caption"],
        description: metadata["$"]["acdsee:description"],
        altText,
        path
      },
      tags: {
        connectOrCreate: tags
      }
    }
    
    // await prisma.photo.create({ data: photo });

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

export async function updatePhoto() {
  // pull up metatadata to view and then update?
  // synchronize with xmps?
  // synchronize smugmug keywords?
}

export async function deletePhoto() {

}
