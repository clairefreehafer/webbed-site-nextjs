import { Metadata } from "next";

import PuzzleBorder from "@/components/the-witness/puzzle-border";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "the witness",
};

export default async function Page() {
  const images = await getAlbumImages("the-witness", "video-games", {
    resize: 650,
    generatePalette: true,
  });
  return images.map((image) => (
    <PuzzleBorder key={image.filename} image={image} />
  ));
}
