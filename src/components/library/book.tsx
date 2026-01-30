import Image from "next/image";

import { ShelvedBook } from "@/types/library";

export default async function Book({ bookJson }: { bookJson: ShelvedBook }) {
  const thickness = bookJson.numberOfPages ? bookJson.numberOfPages / 10 : 30;
  let pagesOffset = 3;
  if (thickness < 20) {
    pagesOffset = 1;
  }
  return (
    <div className="item-container">
      <p className="item-title">
        <em>{bookJson.title}</em>
      </p>

      {bookJson.subtitle && (
        <p className="item-subtitle">{bookJson.subtitle}</p>
      )}
      <a
        href={bookJson.link}
        target="_blank"
        className="book-container"
        style={{
          "--cover-color": bookJson.coverColor ?? "black",
          "--thickness": thickness,
          "--pages-offset": pagesOffset,
        }}
      >
        <div className="book">
          <p aria-hidden className="cover-text">
            {bookJson.title}
            <br />
            by
            <br />
            {bookJson.author}
          </p>
          {bookJson.coverImage && (
            <Image src={bookJson.coverImage ?? null} alt="" fill />
          )}
        </div>
      </a>

      <p className="item-title">{bookJson.author}</p>
    </div>
  );
}
