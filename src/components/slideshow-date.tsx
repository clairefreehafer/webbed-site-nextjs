"use client";

import { useEffect, useRef, useState } from "react";

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

export default function SlideshowDate({ date }: { date: string }) {
  const dateRef = useRef<HTMLDivElement>(null);
  const [calculatedHeight, setCalculatedHeight] = useState(0);

  useEffect(() => {
    if (dateRef.current) {
      const { width } = dateRef.current.getBoundingClientRect();
      setCalculatedHeight((720 / 1280) * width);
    }
  }, []);

  return (
    <div
      className="photo-date"
      ref={dateRef}
      style={{
        height: calculatedHeight,
        opacity: calculatedHeight === 0 ? 0 : 0.9,
      }}
    >
      {formatDate(new Date(date))}
    </div>
  );
}
