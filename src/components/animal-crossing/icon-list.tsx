"use client";

import { slugName } from "@utils/albums";
import Link from "next/link";
import styled from "styled-components";
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

export default function IconList({ albums }: Props) {
  return (
    <Ul>
      {albums.map((album) => (
        <Li key={album.id}>
          <Icon icon={album.icon} height={2} inline date={album.date} />
          <Link href={`/${album.sectionArray.join("/")}/${slugName(album.name)}`}>
            {album.name}
          </Link>
        </Li>
      ))}
    </Ul>
  )
}