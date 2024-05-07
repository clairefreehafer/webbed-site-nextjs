"use client";

import { Photo } from "@prisma/client";
import { AnimalCrossingThemeRoot } from "@styles/animal-crossing/theme";
import { fullScreen } from "@styles/layout";
import styled from "styled-components";

const Main = styled.main`
  ${fullScreen};
  position: relative;
`;

const SlideshowWrapper = styled.ol`
  display: grid;
  grid-auto-columns: 100vw;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 100vw);
  height: 100vh;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
`;

const Slide = styled.li`
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 100vh;
  max-width: 100vw;
  /* padding: BORDER_WIDTH; */
  position: relative;
`;

const SlideSnapper = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  scroll-snap-align: center;
  top: 0;
  width: 100%;
  z-index: -1;
`;

type Props = {
  photos: Partial<Photo>[];
  albumDate: Date;
};

export default function Slideshow({ photos, albumDate }: Props) {
  return (
    <AnimalCrossingThemeRoot $date={albumDate} $shape="triangle">
      <Main>
        <SlideshowWrapper>
          {photos.map((photo) => (
            <Slide key={photo.id}>
              <SlideSnapper />
              <img src={photo.url?.replaceAll("#size#", "L")} />
            </Slide>
          ))}
        </SlideshowWrapper>
      </Main>
    </AnimalCrossingThemeRoot>
  );
}