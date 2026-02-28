import "@/sass/photography/today.scss";

import Breadcrumbs from "@/components/photography/breadcrumbs";
import Masonry from "@/components/photography/masonry";
import { getTodaysImages } from "@/utils/digikam";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  return {
    title: `photos taken on ${months[month].display} ${day}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  const imagesByYear = await getTodaysImages(month, day, "photography");
  const years = Object.keys(imagesByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  return (
    <>
      <div
        style={{
          background: "white",
          padding: "0.25rem 0",
          position: "sticky",
          top: 0,
          zIndex: 11,
        }}
      >
        <Breadcrumbs
          pathOverride={`/photography/${months[month].display}-${day}`}
        />
      </div>
      <main id="today">
        {years.length === 0 ? (
          <p className="page-description">no images :(</p>
        ) : (
          years.map((year) => (
            <details key={year}>
              <summary>
                <span>{year}</span>
              </summary>
              <Masonry images={imagesByYear[year]} />
            </details>
          ))
        )}
      </main>
    </>
  );
}
