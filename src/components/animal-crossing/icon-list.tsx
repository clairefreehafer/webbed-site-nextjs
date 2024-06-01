"use client";

import { slugName } from "@utils/albums";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import Icon from "@components/icon";
import { getPolaroidGridData } from "@utils/prisma/photo";

type Props = {
  albums: Prisma.PromiseReturnType<typeof getPolaroidGridData>;
};

function generateUrl({
  sectionArray,
  name,
}: {
  sectionArray: string[];
  name: string;
}) {
  return (
    sectionArray.reduce(
      (string: string, section: string) => `${string}${slugName(section)}/`,
      "/",
    ) + slugName(name)
  );
}

export default function IconList({ albums }: Props) {
  const iconHeight = 0;

  return (
    <ul className="list-none">
      {albums.map((album) => (
        <li className="flex max-h-12 items-center" key={album.id}>
          <Icon
            icon={album.icon}
            height={iconHeight}
            inline
            date={album.date}
            theme="animalCrossing"
            className="max-h-12 max-w-12 object-contain"
          />
          <Link href={generateUrl(album)}>{album.name}</Link>
        </li>
      ))}
    </ul>
  );
}
