import PuzzleBorder from "@/components/the-witness/puzzle-border";
import { getAlbumImages } from "@/utils/digikam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "the witness — claire freehafer",
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
