"use client";

import CoverImage from "@components/cover-image"
import { Album, Photo } from "@prisma/client"
import { sizePhoto } from "@utils/photo"
import Link from "next/link"
import styled from "styled-components"

const Ul = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  text-align: center;
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

export default function AlbumGrid(
  { albums }: { albums: (Album & { coverPhoto: Photo | null })[] }
) {
  return (
    <Ul>
      {albums.map((album) => (
        <PolaroidBorder key={album.id}>
          <Link href={`/photography/albums/${album.name.replaceAll(" ", "-")}`}>
            <CoverImage src={sizePhoto(album.coverPhoto?.url || "", "L")} aspectRatio="1 / 1" />
            <ImageShadow />
            <AlbumName>
              {album.name}
            </AlbumName>
          </Link>
        </PolaroidBorder>
      ))}
    </Ul>
  )
}