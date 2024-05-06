"use client";

import styled from "styled-components";

type Props = {
  aspectRatio: "1 / 1" | "4 / 3"
  src: string;
}

const Image = styled.img`
  object-fit: cover;
  object-position: 0;
  width: 100%;
`;

export default function CoverImage({ aspectRatio, src }: Props) {
  return (
    <Image
      src={src}
      css={{ aspectRatio }}
      alt=""
    />
  )
}