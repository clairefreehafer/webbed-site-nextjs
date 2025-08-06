"use client";

import { useEffect, useState } from "react";

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

export default function SlideshowDate({
  date,
  imageWidth,
  imageHeight,
  filename,
}: {
  date: string;
  imageWidth: number;
  imageHeight: number;
  filename: string;
}) {
  const [heightAndWidth, setHeightAndWidth] = useState<{
    height: React.CSSProperties["height"];
    width: React.CSSProperties["width"];
  }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const container = document.getElementById(filename);
    if (container) {
      const { width, height } = container.getBoundingClientRect();

      const calculatedWidth = (height * imageWidth) / imageHeight;
      const calculatedHeight = (width * imageHeight) / imageWidth;

      if (calculatedWidth > width) {
        setHeightAndWidth({
          height: calculatedHeight,
          width,
        });
      } else {
        setHeightAndWidth({
          height,
          width: calculatedWidth,
        });
      }
    }
  }, [filename, imageHeight, imageWidth]);

  if (heightAndWidth.height === 0) {
    return null;
  }

  return (
    <div
      className="photo-date"
      style={{
        aspectRatio: `${imageWidth} / ${imageHeight}`,
        ...heightAndWidth,
      }}
    >
      {formatDate(new Date(date))}
    </div>
  );
}
