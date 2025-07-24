import { Image } from "@/utils/digikam";
import NextImage from "next/image";

export default function PuzzleBorder({ image }: { image: Image }) {
  return (
    <>
      <div className="photo-border">
        <div
          className="puzzle-background"
          style={{
            background:
              image.background ?? image.palette?.Muted?.hex ?? "black",
          }}
        >
          <NextImage
            src={image.src}
            alt=""
            className="image"
            width={image.width}
            height={image.height}
          />
        </div>

        <div className="inner-shadow"></div>
      </div>

      <div className="connector"></div>
    </>
  );
}
