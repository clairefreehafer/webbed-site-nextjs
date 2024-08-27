"use client";

import CoverImage from "@components/photography/CoverImage";
import { slugName } from "@utils/albums";
import { sizePhoto } from "@utils/photo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@components/Icon";
import { Prisma } from "@prisma/client";
import { getPolaroidGridData } from "@utils/prisma/photo";
import { loveYaLikeASister } from "@fonts";

function getCoverImageUrl(
  album: Prisma.PromiseReturnType<typeof getPolaroidGridData>[0],
) {
  if (album.coverPhoto?.url) {
    return album.coverPhoto?.url;
  } else if (album.randomCoverPhoto?.url) {
    return album.randomCoverPhoto?.url;
  }
  return "";
}

export default function PolaroidGrid({
  albums,
}: {
  albums: Prisma.PromiseReturnType<typeof getPolaroidGridData>;
}) {
  const pathname = usePathname();

  return (
    <ul className="grid list-none grid-cols-1 gap-4 text-center sm:grid-cols-2">
      {albums.map((album) => (
        <li
          className="relative bg-white p-4 shadow-[0_0_1rem_0.1rem_rgba(0,0,0,0.3)]"
          key={album.id}
        >
          <Link
            href={`${pathname}/${slugName(album.name)}`}
            className="flex flex-col justify-between"
          >
            <CoverImage
              src={sizePhoto(getCoverImageUrl(album), "L")}
              aspectRatio="1 / 1"
            />
            <div className="absolute top-4 aspect-square w-[calc(100%-2rem)] shadow-[inset_0_0_0.25rem_0.1rem_rgba(0,0,0,0.3)]" />
            <h3
              className={`${loveYaLikeASister.className} mx-auto mt-2 flex items-center text-xl`}
            >
              <Icon icon={album.icon} theme="notebook" />
              {album.name}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
