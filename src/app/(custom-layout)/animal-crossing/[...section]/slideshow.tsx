"use client";

import { fotSeuratProB } from "@fonts/animal-crossing";
import type { Photo } from "@prisma/client";
import { AnimalCrossingThemeRoot, textBackground } from "@styles/animal-crossing/theme";
import { fullScreen } from "@styles/layout";
import { SLIDESHOW_UI_Z_INDEX } from "@styles/z-index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const NavBack = styled.nav`
  ${textBackground};
  left: 0.5rem;
  padding: 0.5rem 1rem;
  position: absolute;
  text-align: center;
  top: 0.6rem;
  z-index: ${SLIDESHOW_UI_Z_INDEX};
`;

const SlideInfo = styled.div`
  ${textBackground};
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  position: absolute;
  right: 0.5rem;
  text-align: right;
  top: 0.5rem;
  z-index: ${SLIDESHOW_UI_Z_INDEX};
`

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

const Photo = styled.img`
  box-shadow: 0 0 1.5rem 0.1rem rgba(0, 0, 0, 0.3);
`;

const SlideNavigation = styled.div`
  ${textBackground};
  bottom: 0.5rem;
  left: 50%;
  padding: 0.5rem 1.5rem;
  position: absolute;
  transform: translateX(-50%);
  z-index: ${SLIDESHOW_UI_Z_INDEX};
`;

type Props = {
  photos: Partial<Photo>[];
  albumDate: Date;
  albumName: string;
  albumSection: string[];
};

export default function Slideshow(
  { photos, albumDate, albumName, albumSection }: Props
) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window?.location;
    if (hash) {
      setCurrentSlide(Number(hash[hash.length - 1]));
    }
  }, []);

  function intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const slideNumber = Number(
          entry.target.id[entry.target.id.length - 1]
        );
        setCurrentSlide(slideNumber);
      }
    })
  };

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionObserverCallback, {
      root: null,
      threshold: 1,
    });

    const slidesRefCurrent = slidesRef.current;

    if (slidesRefCurrent.length === photos.length) {
      for (let slide of slidesRefCurrent) {
        if (slide) observer.observe(slide);
      }
    }

    return () => {
      for (let slide of slidesRefCurrent) {
        if (slide) observer.unobserve(slide);
      }
    }
  }, [slidesRef, photos.length]);

  return (
    <AnimalCrossingThemeRoot $date={albumDate} $shape="triangle" className={fotSeuratProB.className}>
      <NavBack>
        {/* TODO: make applicable for all sections */}
        <Link href={`/animal-crossing/${albumSection.slice(0, albumSection.length - 1).join("/")}`}>
          &larr; back
        </Link>
      </NavBack>

      <SlideInfo>
        {albumName}
      </SlideInfo>

      <Main>
        <SlideshowWrapper>
          {photos.map((photo, idx) => (
            <Slide
              key={photo.id}
              id={`slide-${idx + 1}`}
            >
              <SlideSnapper />
              <Photo
                src={photo.url?.replaceAll("#size#", "L")}
                alt={photo.altText || ""}
                id={`photo-${idx + 1}`}
                ref={(node) => {
                  slidesRef.current.push(node);
                }}
              />
            </Slide>
          ))}
        </SlideshowWrapper>
      </Main>

      <SlideNavigation>
        {currentSlide > 1 && (
          <Link
            href={`${pathname}/#slide-${currentSlide - 1}`}
            onClick={() => setCurrentSlide(currentSlide - 1)}
          >
            &larr;
          </Link>
        )}
        &nbsp;
        {currentSlide} / {photos.length}
        &nbsp;
        {currentSlide < photos.length && (
          <Link
            href={`${pathname}/#slide-${currentSlide + 1}`}
            onClick={() => setCurrentSlide(currentSlide + 1)}
          >
            &rarr;
          </Link>
        )}
      </SlideNavigation>
    </AnimalCrossingThemeRoot>
  );
}