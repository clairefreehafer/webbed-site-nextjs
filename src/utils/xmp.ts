import { readFile } from "fs/promises";
import xml2js from "xml2js";

export async function getMetadataFromXmp(path: string) {
  try {
    const xmp = await readFile(path);
    const parser = new xml2js.Parser();
    const parsedXmp = await parser.parseStringPromise(xmp);

    const metadata = parsedXmp["x:xmpmeta"]["rdf:RDF"][0]["rdf:Description"][0];

    const captureDate = new Date(
      metadata["$"]["exif:DateTimeOriginal"] || metadata["$"]["xmp:CreateDate"]
    );

    const tags = metadata["digiKam:TagsList"][0]["rdf:Seq"][0]["rdf:li"].map((tag: string) => {
      return {
        where: { tag },
        create: { tag },
      };
    });

    return {
      captureDate,
      metadata: {
        title: metadata["$"]["acdsee:caption"],
        description: metadata["$"]["acdsee:description"],
        path
      },
      tags: {
        connectOrCreate: tags
      }
    }
  } catch (error) {
    return (error as Error).message;
  }
  
}