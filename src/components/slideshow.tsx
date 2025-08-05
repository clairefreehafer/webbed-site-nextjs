import { Image } from "@/utils/digikam";
import "@/sass/components/slideshow.scss";
import NextImage from "next/image";

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

type SlideshowProps = {
  images: Image[];
};

export default function Slideshow({ images }: SlideshowProps) {
  return (
    <ol className="slides">
      {images.map((image, idx) => (
        <li className="slide" key={image.filename} id={`${idx + 1}`}>
          <div className="snap-point" />
          <div className="image">
            <NextImage
              src={image.src}
              fill
              alt=""
              style={{ objectFit: "contain" }}
            />
            {image.showDate && (
              <div
                className="photo-date"
                style={{
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              >
                {formatDate(new Date(image.dateTaken))}
              </div>
            )}
          </div>
          {image.title && <p className="image-title">{image.title}</p>}
        </li>
      ))}
    </ol>
  );
}
