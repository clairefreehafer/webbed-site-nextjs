"use client";

import CoverImage from "@components/cover-image"
import { slugName } from "@utils/albums";
import { sizePhoto } from "@utils/photo"
import Link from "next/link"
import { usePathname } from "next/navigation";
import styled from "styled-components"
import albumIcons from "./album-icons.json";

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

type PolaroidGridAlbum = {
  id: number;
  name: string;
  coverPhoto: {
    url: string | null;
  } | null,
}

// TODO: move to db
function getLinkIcon(name: string) {
  const linkIcon = (albumIcons as Record<string, string>)[name];
  return linkIcon ? `${linkIcon} ` : null;
}

export default function PolaroidGrid(
  { albums }: { albums: PolaroidGridAlbum[] }
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
              {getLinkIcon(album.name)}
              {album.name}
            </AlbumName>
          </Link>
        </PolaroidBorder>
      ))}
    </Ul>
  )
}