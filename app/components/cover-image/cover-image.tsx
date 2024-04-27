"use client";

import styles from "./cover-image.module.css";

type Props = {
  aspectRatio: "1 / 1" | "4 / 3"
  src: string;
}

export default function CoverImage({ aspectRatio, src }: Props) {
  return (
    <img src={src} className={styles.img} style={{ aspectRatio }} />
  )
}