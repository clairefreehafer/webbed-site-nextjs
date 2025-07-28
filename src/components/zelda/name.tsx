"use client";

import { useEffect, useState } from "react";

const fontClasses = [
  "hylia-serif",
  "hylian",
  "sheikah",
  "sheikah-bold",
] as const;

export default function Name() {
  const [className, setClassName] = useState<(typeof fontClasses)[number]>();

  useEffect(() => {
    if (!className) {
      setClassName(fontClasses[Math.floor(Math.random() * fontClasses.length)]);
    }
  }, []);

  if (!className) {
    return <h1 style={{ opacity: 0 }}>claire freehafer</h1>;
  }

  return <h1 className={className}>claire freehafer</h1>;
}
