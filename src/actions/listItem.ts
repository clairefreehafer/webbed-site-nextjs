"use server";

import { AdminFormState } from "@components/admin/form";
import { ListItem } from "@prisma/client";
import { createListItem } from "@utils/prisma/listItem";
import {
  BookListObject,
  CameraListObject,
  ListItemType,
  MusicListObject,
  PodcastListObject,
  VideoGameListObject,
  WebsiteListObject,
} from "types/lists";

export type ListItemFormState = AdminFormState<ListItem>;

export async function addListItem(
  _prevState: ListItemFormState,
  formData: FormData
) {
  const type = formData.get("type") as ListItemType;

  let data;

  try {
    switch (type) {
      case "book": {
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const year = parseInt(formData.get("year") as string);
        const openLibraryId = formData.get("openLibraryId") as string;

        console.log(`👉 creating book list item for ${title} by ${author}...`);

        data = {
          title,
          author,
          year,
          openLibraryId,
        } satisfies BookListObject;

        break;
      }
      case "camera": {
        const make = formData.get("make") as string;
        const model = formData.get("model") as string;
        const medium = formData.get("medium") as CameraListObject["medium"];

        console.log(`👉 creating camera list item for ${make} ${model}...`);

        data = {
          make,
          model,
          medium,
        } satisfies CameraListObject;
        break;
      }
      case "music": {
        const song = formData.get("song") as string;
        const artist = formData.get("artist") as string;
        const album = formData.get("album") as string;

        console.log(`👉 creating music list item for ${song} ${artist}...`);

        data = {
          song,
          artist,
          album,
        } satisfies MusicListObject;
        break;
      }
      case "podcast": {
        const podcast = formData.get("podcast") as string;
        const episode = formData.get("episode") as string;
        const date = formData.get("date") as string;

        console.log(
          `👉 creating podcast list item for ${podcast} ${episode}...`
        );

        data = {
          podcast,
          episode,
          date,
        } satisfies PodcastListObject;
        break;
      }
      case "video game": {
        const title = formData.get("title") as string;
        const year = parseInt(formData.get("year") as string);

        console.log(`👉 creating video game list item for ${title}...`);

        data = {
          title,
          year,
        } satisfies VideoGameListObject;
        break;
      }
      case "website": {
        const title = formData.get("title") as string;
        const url = formData.get("url") as string;

        console.log(`👉 creating website list item for ${title}...`);

        data = {
          title,
          url,
        } satisfies WebsiteListObject;
        break;
      }
      default:
        throw new Error(`invalid list item type: ${type}`);
    }

    const createdListItem = await createListItem({
      data: {
        type,
        data,
      },
    });

    return {
      ...createdListItem,
      message: "👍 list item created successfully",
    };
  } catch (error) {
    return { ...data, message: `👎 ${(error as Error).message}` };
  }
}
