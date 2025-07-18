import { getTodaysImages } from "@/utils/photography/digikam";
import ImageGrid from "@/components/photography/image-grid";

const months: Record<
  string,
  {
    display: string;
    numberOfDays: number;
  }
> = {
  "01": { display: "january", numberOfDays: 31 },
  "02": { display: "february", numberOfDays: 29 },
  "03": { display: "march", numberOfDays: 31 },
  "04": { display: "april", numberOfDays: 30 },
  "05": { display: "may", numberOfDays: 31 },
  "06": { display: "june", numberOfDays: 30 },
  "07": { display: "july", numberOfDays: 31 },
  "08": { display: "august", numberOfDays: 31 },
  "09": { display: "september", numberOfDays: 30 },
  "10": { display: "october", numberOfDays: 31 },
  "11": { display: "november", numberOfDays: 30 },
  "12": { display: "december", numberOfDays: 31 },
};

export async function generateStaticParams() {
  const pages = [];

  for (const month in months) {
    const { numberOfDays } = months[month];
    for (let i = 1; i <= numberOfDays; i++) {
      const day = i.toString().padStart(2, "0");
      pages.push({ month, day });
    }
  }

  return pages;
}

export default async function Page({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  const imagesByYear = getTodaysImages(month, day);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <h2>
        {day} {months[month].display}
      </h2>
      {Object.keys(imagesByYear).length === 0
        ? "no images :("
        : Object.keys(imagesByYear).map((year) => (
            <>
              <h3>{year}</h3>
              <ImageGrid images={imagesByYear[year]} />
            </>
          ))}
    </div>
  );
}
