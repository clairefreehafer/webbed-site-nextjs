"use client";

import { slugName } from "@utils/albums";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { Prisma } from "@prisma/client";
import Icon from "@components/icon";
import { getPolaroidGridData } from "@utils/prisma/photo";

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  display: flex;
`;

type Props = {
  albums: Prisma.PromiseReturnType<typeof getPolaroidGridData>
};

function generateUrl(
  { sectionArray, name }: { sectionArray: string[], name: string }
) {
  return sectionArray.reduce((string: string, section: string) => (
    `${string}${slugName(section)}/`
  ), "/") + slugName(name)
}

export default function IconList({ albums }: Props) {
  const { iconHeight } = useTheme();

  return (
    <Ul>
      {albums.map((album) => (
        <Li key={album.id}>
          <Icon icon={album.icon} height={iconHeight} inline date={album.date} />
          <Link href={generateUrl(album)}>
            {album.name}
          </Link>
        </Li>
      ))}
    </Ul>
  )
}