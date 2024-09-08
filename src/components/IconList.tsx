import { slugName } from "@utils/album";
import Link from "next/link";
import Icon, { DisplayIconType } from "@components/Icon";
import { Theme, ThemeStyles } from "@themes";

export type IconListAlbum = {
  id: number;
  icon: DisplayIconType | null;
  date: Date | null;
  name: string;
  sectionArray: string[];
};

type Props = {
  albums: IconListAlbum[];
  theme: Theme;
};

function generateUrl({
  sectionArray,
  name,
}: {
  sectionArray: string[];
  name: string;
}) {
  return (
    sectionArray.reduce(
      (string: string, section: string) => `${string}${slugName(section)}/`,
      "/",
    ) + slugName(name)
  );
}

const linkThemes: ThemeStyles = {
  animalCrossing: "text-brown hover:drop-shadow-text hover:text-black",
};

export default function IconList({ albums, theme }: Props) {
  if (!albums) return <>❌ no album data.</>;

  return (
    <ul className={`list-none ${theme === "zelda" && "mb-8"}`}>
      {albums.map((album) => (
        <li className="flex max-h-12 items-center" key={album.id}>
          <Icon icon={album.icon} date={album.date} theme={theme} />
          <Link
            href={generateUrl(album)}
            className={`${linkThemes[theme]} underline hover:no-underline`}
          >
            {album.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
