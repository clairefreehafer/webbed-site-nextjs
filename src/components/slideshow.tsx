"use client";

import type { Photo } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ZeldaSlideInfo from "./zelda/slideshow";
import { Theme } from "@styles/theme";

type Props = {
  photos: Partial<Photo>[];
  albumName: string;
  albumSection: string[];
  theme: Theme;
};

export default function Slideshow({ photos, albumName, albumSection }: Props) {
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
  }, [slidesRef, photos.length]);

  return (
    <>
      <nav className="ac-text-bg z-index-slideshow-ui absolute left-4 top-4 px-4 py-2">
        &larr; back
      </nav>

      <div className="ac-text-bg z-index-slideshow-ui absolute right-4 top-4 px-4 py-2">
        {albumName}
      </div>

      <main className="h-screen w-screen">
        <ol className="grid h-screen snap-x snap-mandatory auto-cols-[100vw] grid-flow-col grid-cols-[repeat(auto-fill,_100vw)] overflow-x-scroll scroll-smooth">
          {photos.map((photo, idx) => (
            <div
              className="max-w-screen relative flex max-h-screen items-center justify-center"
              key={photo.id}
              id={`slide-${idx + 1}`}
            >
              <div className="absolute left-0 top-0 -z-10 h-full w-full snap-center" />
              <img
                src={photo.url?.replaceAll("#size#", "L")}
                alt={photo.altText || ""}
                id={`photo-${idx + 1}`}
                ref={(node) => {
                  slidesRef.current.push(node);
                }}
                className="shadow-[0_0_1.5rem_0.1rem_rgba(0,0,0,0.3)]"
              />
            </div>
          ))}
        </ol>
      </main>

      <div className="ac-text-bg absolute bottom-4 right-1/2 translate-x-2/4 px-4 py-2">
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
    </>
  );
}
