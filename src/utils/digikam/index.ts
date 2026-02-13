import Database from "better-sqlite3";
import fs from "fs";
import pc from "picocolors";
import sharp from "sharp";

export const digikam = new Database(`${process.cwd()}/local/digikam4.db`, {
  readonly: true,
  fileMustExist: true,
  // verbose: console.log,
});
digikam
  .prepare(
    `ATTACH DATABASE '${process.cwd()}/local/thumbnails-digikam.db' AS thumbs`,
  )
  .run();

export async function createImageFile(
  inputPath: string,
  outputSrc: string,
  resize = 1000,
) {
  try {
    const outputPath = `${process.cwd()}/public${outputSrc}`;
    const outputPathSplit = outputPath.split("/");
    const outputDirectory = outputPathSplit
      .slice(0, outputPathSplit.length - 1)
      .join("/");
    const buffer = fs.readFileSync(inputPath);

    // only transform image if it doesn't already exist.
    if (!fs.existsSync(outputPath)) {
      // create output directories if needed
      if (!fs.existsSync(outputDirectory)) {
        console.log(
          "📝",
          pc.dim("[createImageFile]"),
          "creating directory",
          pc.green(outputDirectory),
        );
        fs.mkdirSync(outputDirectory, { recursive: true });
      }
      console.log(
        "📝",
        pc.dim("[createImageFile]"),
        "creating image",
        pc.green(outputPath),
      );
      // transform image
      await sharp(buffer, { animated: true })
        .resize(resize)
        .webp({ quality: 100 })
        .toFile(outputPath);
    }
  } catch (error) {
    // fail gracefully if there is an issue
    console.error(
      "❌",
      pc.dim("[createImageFile]"),
      "issue transforming image data for",
      pc.red(inputPath),
      (error as Error).message,
    );
  }
}

export * from "./albums";
export * from "./cover-photos";
export * from "./images";
export * from "./tags";
