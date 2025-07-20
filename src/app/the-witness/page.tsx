import PuzzleBorder from "@/components/the-witness/puzzle-border";
import { getAlbumImages } from "@/utils/digikam";

export default async function Page() {
  const images = await getAlbumImages("the witness", 650);
  return images.map((image) => (
    <PuzzleBorder key={image.filename} image={image} />
  ));
}
