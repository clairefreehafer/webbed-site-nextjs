"use server";

import { PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";
// import { getSmugMugData } from "../../utils/smugmug";
import xml2js from "xml2js";

export async function createPhoto(_prevState: any, formData: FormData) {
  try {
    const smugMugKey = formData.get("smugMugKey");
    const path = formData.get("path");
    console.log(formData)

    if (!smugMugKey) {
      throw new Error("Must include `smugMugKey` property in POST body.");
    }
    if (!path) {
      throw new Error("Must include `path` property in POST body to fetch metadata.")
    }

    const prisma = new PrismaClient();

    // const existingPhoto = await prisma.photo.findUnique({
    //   where: { smugMugKey }
    // });

    // if (existingPhoto) {
    //   throw new Error(`Photo with smugmug key "${smugMugKey}" is already in the database.`);
    // }

    // const data = await getSmugMugData(smugMugKey);
    // const url = data.Response.ImageSizeDetails.ImageUrlTemplate;
    
    const xmp = await readFile(`${process.env.METADATA_LOCATION}${path}.xmp`);
    const parser = new xml2js.Parser();
    const parsedXmp = await parser.parseStringPromise(xmp);

    const metadata = parsedXmp["x:xmpmeta"]["rdf:RDF"][0]["rdf:Description"][0];
    console.log(metadata)

    const photo = {
      smugMugKey,
      // url,
      captureDate: metadata["$"]["exif:DateTimeOriginal"],
      metadata: {
        title: "",
        subtitle: "",
        altText: "",
      },
      tags: {
        connectOrCreate: [
          // {
          //   where: { id: 32 },
          //   create: { title: 'This is my first post' },
          // },
          // {
          //   where: { id: 19 },
          //   create: { title: 'This is my second post' },
          // },
        ]
      }
    }

    // await prisma.tag.create({ data: { tag }});

    console.log("👍 photo added");
    return "👍 photo added"
  } catch (error) {
    console.error(`👎 ${error}`);
    return `👎 ${error}`;
  }
}
