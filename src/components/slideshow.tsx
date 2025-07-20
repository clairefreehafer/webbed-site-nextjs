"use client";

import { Image } from "@/utils/digikam";
import { useEffect, useRef, useState } from "react";
import "@/sass/slideshow.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextImage from "next/image";

type SlideshowProps = {
  images: Image[];
  backHref: string;
};

export default function Slideshow({ images, backHref }: SlideshowProps) {
  // TODO: combine
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_currentSlideData, setCurrentSlideData] = useState(images[0]);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      setCurrentSlideIndex(Number(hash[hash.length - 1]));
    }
  }, []);

  useEffect(() => {
    function intersectionObserverCallback(
      entries: IntersectionObserverEntry[]
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideNumber = Number(entry.target.id.split("-")[1]);
          setCurrentSlideIndex(slideNumber);
          if (typeof window !== undefined) {
            window.location.hash = slideNumber.toString();
          }
          setCurrentSlideData(images[slideNumber - 1]);
        }
      });
    }
    const observer = new IntersectionObserver(intersectionObserverCallback, {
      root: null,
      threshold: 1,
    });

    const slidesRefCurrent = slidesRef.current;

    if (slidesRefCurrent.length === images.length) {
      for (const slide of slidesRefCurrent) {
        if (slide) {
          observer.observe(slide);
        }
      }
    }
  }, [slidesRef, images]);

  return (
    <div className="container">
      <nav className="back">
        <Link href={backHref}>&larr; back</Link>
      </nav>

      <div className="slide-info">
        {/* <SlideInfo
          theme={theme}
          slideData={{ albumName, ...currentSlideData }}
        /> */}
        slide info
      </div>

      <main>
        <ol className="slides">
          {images.map((image, idx) => (
            <li className="slide" key={image.filename} id={`${idx + 1}`}>
              <div className="snap-point" />
              <NextImage
                src={image.src}
                alt={""}
                id={`image-${idx + 1}`}
                ref={(node) => {
                  slidesRef.current.push(node);
                }}
                className="image"
                height={image.height}
                width={image.width}
              />
            </li>
          ))}
        </ol>
      </main>

      <div className="slide-navigation">
        {currentSlideIndex > 1 && (
          <Link
            href={`${pathname}/#${currentSlideIndex - 1}`}
            onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          >
            &larr;
          </Link>
        )}
        &nbsp;
        {currentSlideIndex} / {images.length}
        &nbsp;
        {currentSlideIndex < images.length && (
          <Link
            href={`${pathname}/#${currentSlideIndex + 1}`}
            onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          >
            &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
