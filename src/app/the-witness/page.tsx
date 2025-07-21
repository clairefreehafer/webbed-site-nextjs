import PuzzleBorder from "@/components/the-witness/puzzle-border";
import { getAlbumImages } from "@/utils/digikam";

export default async function Page() {
  const images = await getAlbumImages("the witness", {
    resize: 650,
    generatePalette: true,
  });
  return images.map((image) => (
    <PuzzleBorder key={image.filename} image={image} />
  ));
}
