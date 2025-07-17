import { getChronologicalImages } from "@/utils/photography/digikam";
import fs from "fs";
import sharp from "sharp";

// sqlite3.verbose();

export default async function Page() {
  // const [digikam, thumbs] = await Promise.all([
  //   open({
  //     filename: `${process.cwd()}/digikam4.db`,
  //     mode: sqlite3.OPEN_READONLY,
  //     driver: sqlite3.Database,
  //   }),
  //   open({
  //     filename: `${process.cwd()}/thumbnails-digikam.db`,
  //     mode: sqlite3.OPEN_READONLY,
  //     driver: sqlite3.Database,
  //   }),
  // ]);
  // const imageInfo = await digikam.all(`
  //   SELECT
  //     id, name, creationDate
  //   FROM
  //     Images
  //     LEFT JOIN ImageInformation ON Images.id = ImageInformation.imageid
  //   ORDER BY
  //     creationDate DESC
  //   LIMIT 100
  // `);
  // const imageThumbs = await thumbs.all(`

  // `)
  // console.log(images);

  const images = getChronologicalImages();
  console.log(images[0]);
  // var img = fs.readFileSync(images[0].path)
  // console.log(img);

  return images.map(async (image) => {
    if (!image.collection) return null;
    const buffer = fs.readFileSync(image.path); //.toString("base64");
    const base64 = await sharp(buffer).resize(200).webp().toBuffer();
    return (
      <img
        src={`data:image/png;base64,${base64.toString("base64")}`}
        key={(image as any).image_id}
      />
    );
  });
}
