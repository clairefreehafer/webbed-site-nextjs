import { hyliaSerif } from "@fonts/zelda";
import { Prisma } from "@prisma/client";
import { getAlbumPhotos } from "@utils/prisma/photo";

type Props = {
  slideData: Prisma.PromiseReturnType<typeof getAlbumPhotos>[0] & {
    albumName: string | null;
  };
  theme: "zelda" | "animalCrossing";
};

export default function SlideInfo({ slideData, theme }: Props) {
  const { metadata, icon, albumName } = slideData;

  return (
    <>
      {theme === "zelda" ? (
        <>
          {metadata?.title}
          <img src={icon?.imagePath || ""} alt="" />
          <span className={`${hyliaSerif.className} text-2xl`}>
            {metadata?.compendiumNumber}
          </span>
        </>
      ) : (
        albumName
      )}
    </>
  );
}
