"use client";

import CoverImage from "@components/photography/CoverImage";
import { slugName } from "@utils/album";
import { sizePhoto } from "@utils/smugmug";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { DisplayIconType } from "@components/Icon";
import { css } from "@panda/css";

/** album values needed for the PolaroidGrid component. */
export type PolaroidGridAlbum = {
  id: number;
  name: string;
  coverPhoto: { url: string | null } | null;
  randomCoverPhoto: { url?: string | null };
  icon: DisplayIconType | null;
};

function getCoverImageUrl(album: PolaroidGridAlbum) {
  if (album.coverPhoto?.url) {
    return album.coverPhoto?.url;
  } else if (album.randomCoverPhoto?.url) {
    return album.randomCoverPhoto?.url;
  }
  return "";
}

const grid = css({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  listStyleType: "none",
});

const listItem = css({
  bg: "white",
  boxShadow: "0 0 1rem 0.1rem rgba(0,0,0,0.3)",
  position: "relative",
  p: "1rem",
});

const insetShadow = css({
  aspectRatio: "1/1",
  boxShadow: "inset 0 0 0.25rem 0.1rem rgba(0,0,0,0.3)",
  position: "absolute",
  top: "1rem",
  width: "calc(100% - 2rem)",
});

const text = css({
  display: "flex",
  fontFamily: "loveYaLikeASister",
  fontSize: "1.25rem",
  justifyContent: "center",
  marginTop: "1rem",
});

export default function PolaroidGrid({
  albums,
}: {
  albums: PolaroidGridAlbum[];
}) {
  const pathname = usePathname();

  if (!albums) return <>❌ no album data.</>;

  return (
    <ul className={grid}>
      {albums.map((album) => (
        <li className={listItem} key={album.id}>
          <Link href={`${pathname}/${slugName(album.name)}`}>
            <CoverImage
              src={sizePhoto(getCoverImageUrl(album), "L")}
              aspectRatio="1 / 1"
            />
            <div className={insetShadow} />
            <h3 className={text}>
              <Icon icon={album.icon} display="inline" />
              {album.name}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
