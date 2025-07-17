import { getTodaysImages } from "@/utils/photography/digikam";
import ImageGrid from "@/components/photography/image-grid";

export async function generateStaticParams() {
  return [{ month: "07", day: "17" }];
}

const months: Record<string, string> = {
  "01": "january",
  "07": "july",
};

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
        {day} {months[month]}
      </h2>
      {Object.keys(imagesByYear).map((year) => (
        <>
          <h3>{year}</h3>
          <ImageGrid images={imagesByYear[year]} />
        </>
      ))}
    </div>
  );
}
