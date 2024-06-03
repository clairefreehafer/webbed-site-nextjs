import { slugName } from "@utils/albums";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import Icon from "@components/icon";
import { getPolaroidGridData } from "@utils/prisma/photo";
import { Theme } from "@styles/theme";

type Props = {
  albums: Prisma.PromiseReturnType<typeof getPolaroidGridData>;
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

export default function IconList({ albums, theme }: Props) {
  return (
    <ul className={`list-none ${theme === "zelda" && "mb-8"}`}>
      {albums.map((album) => (
        <li className="flex max-h-12 items-center" key={album.id}>
          <Icon icon={album.icon} date={album.date} theme={theme} />
          <Link
            href={generateUrl(album)}
            className="underline hover:no-underline"
          >
            {album.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
