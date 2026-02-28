import "@/sass/photography/masonry.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

export default function Masonry({
  images,
  background,
  maxNumberOfColumns = 3,
}: {
  images: Image[];
  background?: React.CSSProperties["background"];
  maxNumberOfColumns?: number;
}) {
  const columns: Record<string, Image[][]> = {};

  for (const image in images) {
    for (let numCols = 1; numCols <= maxNumberOfColumns; numCols++) {
      if (!columns[numCols]) {
        columns[numCols] = Array.from({ length: numCols }, () => []);
      }

      const column = parseInt(image) % numCols;
      columns[numCols][column].push(images[image]);
    }
  }

  return (
    <>
      {Object.keys(columns).map((numberOfColumns) => (
        <div
          key={numberOfColumns}
          className={`masonry cols-${numberOfColumns}`}
          style={background ? { background } : {}}
        >
          {columns[numberOfColumns].map(
            (column, idx) =>
              column.length > 0 && (
                <div key={idx} className="column">
                  {column.map((image) => (
                    <NextImage
                      src={image.src}
                      height={image.height}
                      width={image.width}
                      alt=""
                      id={image.filename}
                      key={image.filename}
                      className="image"
                    />
                  ))}
                </div>
              ),
          )}
        </div>
      ))}
    </>
  );
}
