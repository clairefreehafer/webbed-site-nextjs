import { slugName } from "@utils/albums";
import Link from "next/link";
import Icon from "@components/icon";
import { Theme } from "@styles/theme";
import { getIconListAlbums } from "@utils/prisma/album";

type Props = {
  section: string;
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

const linkThemes: Record<Theme, string> = {
  default: "",
  notebook: "",
  animalCrossing: "text-brown hover:drop-shadow-text hover:text-black",
  admin: "",
  zelda: "",
};

export default async function IconList({ section, theme }: Props) {
  const albums = await getIconListAlbums(section);

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
