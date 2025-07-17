import { DigikamImage } from "@/utils/photography/digikam";
import Image from "next/image";
import fs from "fs";
import sharp from "sharp";

export default function ImageGrid({ images }: { images: DigikamImage[] }) {
  return (
    <div className="grid">
      {images.map(async (image) => {
        try {
          const buffer = fs.readFileSync(image.path);
          const base64 = (await sharp(buffer).webp().toBuffer()).toString(
            "base64"
          );
          return (
            <Image
              key={image.id}
              src={`data:image/webp;base64,${base64}`}
              height={image.height}
              width={image.width}
              alt=""
              className="photo"
            />
          );
        } catch (error) {
          console.log(
            "❌ [ImageGrid] problem loading image:",
            (error as Error).message
          );
          return null;
        }
      })}
    </div>
  );
}
