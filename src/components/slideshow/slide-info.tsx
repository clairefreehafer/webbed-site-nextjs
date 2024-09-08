import { hyliaSerif } from "@fonts/zelda";
import { Prisma } from "@prisma/client";
import { Theme } from "@themes";
import { getAlbumPhotos } from "@utils/prisma/photo";

type Props = {
  slideData: Prisma.PromiseReturnType<typeof getAlbumPhotos>[0] & {
    albumName: string | null;
  };
  theme: Theme;
  className: string;
};

export default function SlideInfo({ slideData, theme, className }: Props) {
  const { metadata, icon, albumName } = slideData;

  return (
    <div className={`${className} z-slideshow-ui absolute right-4 top-4`}>
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
    </div>
  );
}
