import { slugify } from "@/utils";
import {
  CategoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";
import albumIds from "./albumIds.json";
import { writeFile } from "fs/promises";

export const dynamicParams = false;

export async function generateStaticParams() {
  const piwigoParams = {
    cat_id: CategoryId.Albums,
  };
  const { categories } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetList,
    piwigoParams
  );
  const staticParams = [];

  for (const category of categories) {
    if (category.id.toString() !== CategoryId.Albums) {
      const albumSlug = slugify(category.name) as keyof typeof albumIds;

      if (!albumIds[albumSlug]) {
        console.log(`📝 adding cat_id for ${category.name}`);
        albumIds[albumSlug] = category.id.toString();
        await writeFile(
          `${process.cwd()}/src/app/photography/albums/[album]/albumIds.json`,
          JSON.stringify(albumIds)
        );
      }

      staticParams.push({
        album: albumSlug,
      });
    }
  }
  return staticParams;
}

export default async function Page({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album as keyof typeof albumIds;
  const piwigoParams = {
    cat_id: albumIds[albumSlug],
  };
  const { images } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetImages,
    piwigoParams
  );
  return images.length;
}
