import Image from "next/image";

import { ShelvedFilm, ShelvedTv } from "@/types/library";

export default async function Vhs({
  vhsJson,
}: {
  vhsJson: ShelvedTv | ShelvedFilm;
}) {
  return (
    <div className="item-container">
      <p className="item-title">{vhsJson.title}</p>
      {vhsJson.coverImage ? (
        <a
          href={vhsJson.link}
          target="_blank"
          className="book-container"
          style={{
            "--cover-color": vhsJson.coverColor ?? "black",
          }}
        >
          <div className="vhs">
            <Image src={vhsJson.coverImage} alt="" fill />
          </div>
        </a>
      ) : (
        <div>{/* make blurry */}</div>
      )}
      {/* <p>{cd.author}</p> */}
    </div>
  );
}
