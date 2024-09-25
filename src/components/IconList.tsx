import { slugName } from "@utils/album";
import Icon, { DisplayIconType } from "@components/Icon";
import { RecipeVariant, css, cva } from "@panda/css";
import StyledLink from "./Link";

export type IconListAlbum = {
  id: number;
  icon: DisplayIconType | null;
  date: Date | null;
  name: string;
  sectionArray: string[];
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
      "/"
    ) + slugName(name)
  );
}

const list = css({
  listStyleType: "none",
});

const listItem = css({
  alignItems: "center",
  display: "flex",
});

const link = cva({
  base: {
    textDecoration: "underline",
    _hover: {
      textDecoration: "none",
    },
  },
  variants: {
    theme: {
      animalCrossing: {
        color: "brown",
        _hover: {
          color: "black",
          textShadow: "text",
        },
      },
      zelda: {},
    },
  },
});

type Props = {
  albums: IconListAlbum[];
  theme?: RecipeVariant<typeof link>["theme"];
};

export default function IconList({ albums, theme }: Props) {
  if (!albums) return <>❌ no album data.</>;

  return (
    <ul className={list}>
      {albums.map((album) => (
        <li className={listItem} key={album.id}>
          <Icon
            icon={album.icon}
            date={album.date}
            theme={theme}
            display="inline"
          />
          <StyledLink href={generateUrl(album)}>{album.name}</StyledLink>
        </li>
      ))}
    </ul>
  );
}
