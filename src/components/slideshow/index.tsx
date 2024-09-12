"use client";

import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SlideInfo from "./SlideInfo";
import { getAlbumPhotos } from "@utils/prisma/photo";
import { css, cva, cx } from "@panda/css";
import { acnhTextBackground } from "@styles/animalCrossing";
import { fillParent } from "@utils/layout";
import { zeldaTextBackground } from "@styles/zelda";

const ui = cva({
  base: {
    position: "absolute",
    zIndex: "slideshow.ui",
  },
  variants: {
    theme: {
      animalCrossing: {
        ...acnhTextBackground,
        px: "1rem",
        py: "0.5rem",
      },
      zelda: {
        ...zeldaTextBackground,
        px: "2rem",
        py: "1rem",
      },
    },
    component: {
      nav: {
        top: "1rem",
        left: "1rem",
      },
      info: {
        right: "1rem",
        top: "1rem",
      },
      slideChange: {
        bottom: "1rem",
        right: "50%",
        transform: "translateX(50%)",
      },
    },
  },
  compoundVariants: [
    {
      theme: "animalCrossing",
      component: "nav",
      css: {},
    },
  ],
});

const slides = cx(
  css(fillParent),
  css({
    display: "grid",
    gridAutoColumns: "100vw",
    gridAutoFlow: "column",
    gridTemplateColumns: "repeat(auto-fill, 100vw)",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    scrollSnapType: "x mandatory",
  })
);

const slide = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  listStyleType: "none",
  position: "relative",
});

// "absolute left-0 top-0 -z-10 h-full w-full snap-center"
const snapPoint = cx(
  css(fillParent),
  css({
    position: "absolute",
    left: 0,
    scrollSnapAlign: "center",
    top: 0,
  })
);

type Props = {
  photos: Prisma.PromiseReturnType<typeof getAlbumPhotos>;
  albumName: string;
  albumSection: string;
  theme: (typeof ui.variantMap.theme)[number];
};

export default function Slideshow({
  photos,
  albumName,
  albumSection,
  theme,
}: Props) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [currentSlideData, setCurrentSlideData] = useState(photos[0]);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window?.location;
    if (hash) {
      setCurrentSlideIndex(Number(hash[hash.length - 1]));
    }
  }, []);

  function intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const slideNumber = Number(entry.target.id[entry.target.id.length - 1]);
        setCurrentSlideIndex(slideNumber);
        setCurrentSlideData(photos[slideNumber - 1]);
      }
    });
  }

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
    };
  }, [slidesRef, photos.length, intersectionObserverCallback]);

  return (
    <div>
      <nav className={ui({ theme, component: "nav" })}>
        <Link href={`/${albumSection}`}>&larr; back</Link>
      </nav>

      <div className={ui({ theme, component: "info" })}>
        <SlideInfo
          theme={theme}
          slideData={{ albumName, ...currentSlideData }}
        />
      </div>

      <main className={css(fillParent)}>
        <ol className={slides}>
          {photos.map((photo, idx) => (
            <li className={slide} key={photo.id} id={`slide-${idx + 1}`}>
              <div className={snapPoint} />
              <img
                src={photo.url?.replaceAll("#size#", "L")}
                alt={photo.altText || ""}
                id={`photo-${idx + 1}`}
                ref={(node) => {
                  slidesRef.current.push(node);
                }}
                className={css({
                  boxShadow: "0 0 1.5rem 0.1rem rgba(0, 0, 0, 0.3)",
                })}
              />
            </li>
          ))}
        </ol>
      </main>

      <div className={ui({ theme, component: "slideChange" })}>
        {currentSlideIndex > 1 && (
          <Link
            href={`${pathname}/#slide-${currentSlideIndex - 1}`}
            onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          >
            &larr;
          </Link>
        )}
        &nbsp;
        {currentSlideIndex} / {photos.length}
        &nbsp;
        {currentSlideIndex < photos.length && (
          <Link
            href={`${pathname}/#slide-${currentSlideIndex + 1}`}
            onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          >
            &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
