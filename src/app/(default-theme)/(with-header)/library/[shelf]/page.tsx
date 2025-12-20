import Book from "@/components/library/book";
import Dvd from "@/components/library/dvd";
import Vhs from "@/components/library/vhs";
import { deslugify, noRobots } from "@/utils";
import { getShelves } from "@/utils/library";
import { ShelvedItem } from "@/utils/types";

function renderItem(item: ShelvedItem) {
  switch (item.type) {
    case "book":
      return <Book bookJson={item} key={JSON.stringify(item)} />;
    case "tv":
    case "film":
      return <Vhs vhsJson={item} key={JSON.stringify(item)} />;
    case "video-game":
      return <Dvd dvdJson={item} key={JSON.stringify(item)} />;
    default:
      const exhaustiveCheck: never = item;
      throw new Error(
        `shelved item type not implemented: ${
          (exhaustiveCheck as ShelvedItem).type
        }`
      );
  }
}

type Params = { shelf: string };

export async function generateStaticParams(): Promise<Params[]> {
  const shelvesJson = await getShelves();

  return shelvesJson.map((shelf) => ({
    shelf: shelf.slug,
  }));
}

export async function generateMetadata() {
  const shelvesJson = await getShelves();

  return Object.keys(shelvesJson).map((shelf) => ({
    title: `${deslugify(shelf)} shelf`,
    noRobots,
  }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { shelf } = await params;
  const shelvesJson = await getShelves();
  const shelfData = shelvesJson.find((data) => data.slug === shelf);
  if (!shelfData) {
    return <p>couldn&apos;t find shelf with slug {shelf}</p>;
  }
  const { description, items, title } = shelfData;

  const hasSections = !Array.isArray(items);

  return (
    <div className="shelves">
      <h3 className="shelf-title">{title}</h3>

      {description && <p className="shelf-description">{description}</p>}

      {hasSections ? (
        Object.keys(items).map((section) => (
          <div key={section}>
            <h4 className="section-title">{deslugify(section)}</h4>
            <div className="shelf">{items[section].map(renderItem)}</div>
          </div>
        ))
      ) : (
        <div className="shelf">{items.map(renderItem)}</div>
      )}
    </div>
  );
}
