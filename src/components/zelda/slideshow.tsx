"use client";

import { SLIDESHOW_UI_Z_INDEX } from "@styles/z-index";
import { zeldaTextBackground } from "@styles/zelda/theme";
import styled from "styled-components";

const SlideInfo = styled.div`
  ${zeldaTextBackground};
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  position: absolute;
  right: 0.5rem;
  text-align: right;
  top: 0.5rem;
  z-index: ${SLIDESHOW_UI_Z_INDEX};
`;

export default function ZeldaSlideInfo({ slideData }: { slideData: any }) {
  const { metadata, icon } = slideData;

  console.log(slideData)

  return (
    <SlideInfo>
      {metadata?.title}
      {icon?.imagePath}
      {metadata?.compendiumNumber}
    </SlideInfo>
  )
}