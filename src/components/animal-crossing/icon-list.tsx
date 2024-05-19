"use client";

import { slugName } from "@utils/albums";
import Link from "next/link";
import iconList from "./icon-list.json";
import { getAstrologyDateRange } from "@utils/animal-crossing";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  display: flex;
`;

const PageIcon = styled.img`
  max-height: 2rem;
  margin-right: 0.25rem;
`;

type Props = {
  albums: {
    id: number,
    name: string,
    date: Date | null,
    section: string[]
  }[]
};

// TODO: move to db
function getLinkIcon(name: string, date: Date | null) {
  const linkIcon = (iconList as Record<string, string>)[name];
  if (linkIcon) {
    return <PageIcon src={`/images/animal-crossing/${linkIcon}`} alt="" />
  } 
  if (date) {
    return <PageIcon src={`/images/animal-crossing/star-fragments/star-fragment_${getAstrologyDateRange(date)}.png`} alt="" />;
  }
  return null;
}

export default function IconList({ albums }: Props) {
  return (
    <Ul>
      {albums.map((album) => (
        <Li key={album.id}>
          {getLinkIcon(album.name, album.date)}
          <Link href={`/${album.section.join("/")}/${slugName(album.name)}`}>
            {album.name}
          </Link>
        </Li>
      ))}
    </Ul>
  )
}