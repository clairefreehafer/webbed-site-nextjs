import Image from "next/image";

import { ShelvedVideoGame } from "@/types/library";

export default async function Dvd({ dvdJson }: { dvdJson: ShelvedVideoGame }) {
  return (
    <div className="item-container">
      <p className="item-title">{dvdJson.title}</p>
      {dvdJson.coverImage ? (
        <a
          href={dvdJson.link}
          target="_blank"
          className="book-container"
          style={{
            "--cover-color": dvdJson.coverColor ?? "black",
            "--thickness": 10,
          }}
        >
          <div className="dvd">
            <Image src={dvdJson.coverImage} alt="" fill objectFit="cover" />
          </div>
        </a>
      ) : (
        <div>{/* make blurry */}</div>
      )}
      {/* <p>{cd.author}</p> */}
    </div>
  );
}
