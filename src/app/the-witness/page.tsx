import PuzzleBorder from "@/components/the-witness/puzzle-border";
import { getAlbumImages } from "@/utils/photography/digikam";

export default async function Page() {
  const images = await getAlbumImages("the witness");
  return images.map((image) => (
    <PuzzleBorder key={image.filename} image={image} />
  ));
}
