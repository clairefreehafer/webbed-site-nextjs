"use client";

import CoverImage from "@components/cover-image"
import { slugName } from "@utils/albums";
import { sizePhoto } from "@utils/photo"
import Link from "next/link"
import { usePathname } from "next/navigation";
import styled from "styled-components"
import Icon from "@components/icon";
import { Prisma } from "@prisma/client";
import { getAlbumGridData } from "@utils/prisma";

const Ul = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const PolaroidBorder = styled.li`
  background-color: white;
  box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.3);
  padding: 1rem;
  position: relative;
`;

const ImageShadow = styled.div`
  aspect-ratio: 1 / 1;
  box-shadow: inset 0 0 0.25rem 0.1rem rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 1rem;
  width: calc(100% - 2rem);
`;

const AlbumName = styled.h3`
  margin: 0.5rem auto;
`;

export default function PolaroidGrid(
  { albums }: { albums: Prisma.PromiseReturnType<typeof getAlbumGridData> }
) {
  const pathname = usePathname();

  return (
    <Ul>
      {albums.map((album) => (
        <PolaroidBorder key={album.id}>
          <Link href={`${pathname}/${slugName(album.name)}`}>
            <CoverImage src={sizePhoto(album.coverPhoto?.url || "", "L")} aspectRatio="1 / 1" />
            <ImageShadow />
            <AlbumName>
              <Icon icon={album.icon} inline />
              {album.name}
            </AlbumName>
          </Link>
        </PolaroidBorder>
      ))}
    </Ul>
  )
}