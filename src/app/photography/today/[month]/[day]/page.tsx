import { getTodaysImages } from "@/utils/digikam";
import ImageGrid from "@/components/photography/image-grid";
import Link from "next/link";
import React from "react";

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
    title: `photos taken on ${months[month].display} ${day} — claire freehafer`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;
  const imagesByYear = await getTodaysImages(month, day);
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>
          {months[month].display} {day}
        </h2>
      </div>
      {Object.keys(imagesByYear).length === 0
        ? "no images :("
        : Object.keys(imagesByYear).map((year) => (
            <React.Fragment key={year}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  textDecorationLine: "underline overline",
                  textDecorationStyle: "wavy",
                  marginTop: "1rem",
                }}
              >
                {year}
              </h3>
              <ImageGrid images={imagesByYear[year]} />
            </React.Fragment>
          ))}
    </>
  );
}
