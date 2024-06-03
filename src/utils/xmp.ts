import { Prisma } from "@prisma/client";
import { readFile } from "fs/promises";
import xml2js from "xml2js";

export async function getMetadataFromXmp(path: string) {
  try {
    // TODO: error handling if drive isn't connected
    const xmp = await readFile(path);
    const parser = new xml2js.Parser();
    const parsedXmp = await parser.parseStringPromise(xmp);

    const metadata = parsedXmp["x:xmpmeta"]["rdf:RDF"][0]["rdf:Description"][0];

    const captureDate = new Date(
      metadata["$"]["exif:DateTimeOriginal"] ||
        metadata["$"]["xmp:CreateDate"] ||
        metadata["$"]["xmp:ModifyDate"],
    );

    const tagData: Prisma.TagCreateOrConnectWithoutPhotosInput[] = [];

    metadata["digiKam:TagsList"][0]["rdf:Seq"][0]["rdf:li"].forEach(
      (tag: string) => {
        if (tag.includes("/")) {
          const splitTags = tag.split("/");
          // let parentTag = "";

          splitTags.forEach((splitTag, i) => {
            // if (i === splitTags.length - 1) {
            // only connect to leaf tag.
            tagData.push({
              where: { name: splitTag },
              create: {
                name: splitTag,
                // TODO: perhaps add this back in somehow, but we don't want photos
                // tagged with parent tags most of the time.
                // ...(parentTag && { parentName: parentTag })
              },
            });
            console.log(`👉 adding tag ${splitTag}...`);
            // }
            // parentTag = splitTag;
          });
        } else {
          tagData.push({
            where: { name: tag },
            create: { name: tag },
          });
        }
      },
    );

    return {
      captureDate,
      metadata: {
        title: metadata["$"]["acdsee:caption"],
        description: metadata["$"]["acdsee:description"],
      },
      tags: { connectOrCreate: tagData },
    };
  } catch (error) {
    return (error as Error).message;
  }
}
