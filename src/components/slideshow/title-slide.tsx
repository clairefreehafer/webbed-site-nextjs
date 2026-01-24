import Link from "next/link";

import { deslugify, slugify } from "@/utils";
import { Album, Image } from "@/utils/digikam";

export default function TitleSlide({
  album,
  images,
}: {
  album: Album | undefined;
  images: Image[];
}) {
  if (!album) {
    return null;
  }

  const allTitleCards = images.reduce<string[]>((arr, image) => {
    if (image.titleCard) {
      arr.push(image.titleCard);
    }
    return arr;
  }, []);

  const { description, displayName, slug } = album;

  if (!description && allTitleCards.length === 0) {
    return null;
  }

  return (
    <li className="slide info-slide">
      <div className="snap-point" />
      <h1>{displayName ?? deslugify(slug ?? "")}</h1>
      {description && <p>{description}</p>}
      <p>{images.length} images</p>

      <p className="swipe-to-view">swipe to view &rarr;</p>
      <p className="scroll-to-view">scroll to view &rarr;</p>

      {allTitleCards.length > 0 && (
        <div>
          <p>skip to:</p>
          <ul>
            {allTitleCards.map((titleCard) => (
              <li key={titleCard}>
                <Link
                  href={`/photography/albums/${slug}#${slugify(titleCard)}`}
                >
                  {titleCard}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
