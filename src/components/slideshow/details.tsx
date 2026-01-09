import NextImage from "next/image";

import { Image } from "@/utils/digikam";

export default function Details({ image }: { image: Image }) {
  if (image.albumCollection === "tears-of-the-kingdom") {
    return (
      <div className="image-details-container">
        <div className="image-details">
          {image.compendiumNumber && (
            <p className="compendium-number" title="compendium number">
              {image.compendiumNumber}
            </p>
          )}

          {image.icon && (
            <NextImage
              src={`/images/zelda/icons/${image.icon}.svg`}
              alt=""
              width={47}
              height={47}
              style={{ height: "2rem", width: "2rem" }}
            />
          )}
          {image.title}
        </div>
      </div>
    );
  }
  if (image.title) {
    return (
      <div className="image-details-container">
        <p className="image-title">{image.title}</p>
      </div>
    );
  }
  return null;
}
