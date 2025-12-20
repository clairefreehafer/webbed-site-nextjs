import { readdirSync, readFileSync, writeFileSync } from "fs";
import { Vibrant } from "node-vibrant/node";
import path from "path";
import { cache } from "react";
import sharp from "sharp";

import {
  Shelf,
  ShelvedBook,
  ShelvedItem,
  ShelvedTv,
  ShelvedVideoGame,
} from "../types";
import {
  getAuthorData,
  getBookData,
  getTvData,
  OPEN_LIBRARY_URL_BASE,
} from "./api";

export const getShelves = cache(async () => {
  const shelfFiles = readdirSync(
    path.join(`${process.cwd()}/src/data/library`)
  );

  const shelves: Shelf[] = [];
  for (const shelfFile of shelfFiles) {
    const file = readFileSync(`${process.cwd()}/src/data/library/${shelfFile}`);
    const shelfJson = JSON.parse(file.toString());
    shelves.push({
      slug: shelfFile.split(".")[0],
      ...shelfJson,
    });
  }
  return shelves;
});

/** Returns whether or not the JSON was updated. */
async function updateShelvedBook(bookJson: ShelvedBook): Promise<boolean> {
  if (!bookJson.olid) {
    console.warn(
      `📙 [updateShelvedBook] missing OLID:\n${JSON.stringify(bookJson)}`
    );
    return false;
  }
  const keysToCheck = [
    "title",
    "link",
    "coverImage",
    "coverColor",
    "numberOfPages",
    "author",
  ] satisfies (keyof ShelvedBook)[];
  const keysToUpdate: (typeof keysToCheck)[number][] = [];

  for (const key of keysToCheck) {
    if (!bookJson[key]) {
      keysToUpdate.push(key);
    }
  }
  if (keysToUpdate.length === 0) {
    // all keys are set, no update needed.
    return false;
  }

  const openLibraryData = await getBookData(bookJson.olid);

  for (const keyToUpdate of keysToUpdate) {
    switch (keyToUpdate) {
      case "coverImage":
        bookJson.coverImage = `https://covers.openlibrary.org/b/olid/${bookJson.olid}-M.jpg`;
        break;
      case "title":
        // TODO: figure out what title/subtitle/full title combination to use
        bookJson.title = openLibraryData.full_title ?? openLibraryData.title;
        break;
      case "link":
        bookJson.link = `${OPEN_LIBRARY_URL_BASE}${openLibraryData.key}`;
        break;
      case "coverColor":
        try {
          const palette = await Vibrant.from(
            bookJson.coverImage ??
              `https://covers.openlibrary.org/b/olid/${bookJson.olid}-M.jpg`
          ).getPalette();
          bookJson.coverColor = palette.Vibrant?.hex;
        } catch (e) {
          console.warn(
            `📕 [updateShelvedBook] could not generate palette: ${e}`
          );
        }
        break;
      case "numberOfPages":
        bookJson.numberOfPages = openLibraryData.number_of_pages;
        break;
      case "author":
        const authorKey = openLibraryData.authors[0].key.split("/")[2];
        const authorData = await getAuthorData(authorKey);
        bookJson.author = authorData.name;
        break;
      default:
        console.warn(
          `📕 [updateShelvedBook] unknown key to update: ${keyToUpdate}`
        );
    }
  }

  return true;
}

/** Returns whether or not the JSON was updated. */
async function updateShelvedTv(tvJson: ShelvedTv): Promise<boolean> {
  if (!tvJson.tvdbId) {
    console.warn(`❌ [updateShelvedTv] missing TVDB ID: ${tvJson.title}`);
    return false;
  }
  const keysToCheck = [
    "title",
    "link",
    "coverImage",
    "coverColor",
  ] satisfies (keyof ShelvedTv)[];
  const keysToUpdate: (typeof keysToCheck)[number][] = [];

  for (const key of keysToCheck) {
    if (!tvJson[key]) {
      keysToUpdate.push(key);
    }
  }
  if (keysToUpdate.length === 0) {
    // all keys are set, no update needed.
    return false;
  }

  const { data } = await getTvData(tvJson.tvdbId);

  for (const keyToUpdate of keysToUpdate) {
    switch (keyToUpdate) {
      case "coverImage":
        tvJson.coverImage = data.image;
        break;
      case "title":
        tvJson.title = data.name;
        break;
      case "link":
        tvJson.link = `https://www.thetvdb.com/series/${data.slug}`;
        break;
      case "coverColor":
        try {
          const palette = await Vibrant.from(
            tvJson.coverImage ?? data.image
          ).getPalette();
          tvJson.coverColor = palette.DarkVibrant?.hex;
        } catch (e) {
          console.warn(`📕 [updateShelvedTv] could not generate palette: ${e}`);
        }
        break;
      default:
        console.warn(
          `❌ [updateShelvedTv] unknown key to update: ${keyToUpdate}`
        );
    }
  }

  return true;
}

/** Returns whether or not the JSON was updated. */
async function updateShelvedVideoGame(
  videoGameJson: ShelvedVideoGame
): Promise<boolean> {
  const keysToCheck = ["coverColor"] satisfies (keyof ShelvedVideoGame)[];
  const keysToUpdate: (typeof keysToCheck)[number][] = [];

  for (const key of keysToCheck) {
    if (!videoGameJson[key]) {
      keysToUpdate.push(key);
    }
  }
  if (keysToUpdate.length === 0) {
    // all keys are set, no update needed.
    return false;
  }

  for (const keyToUpdate of keysToUpdate) {
    switch (keyToUpdate) {
      case "coverColor":
        if (videoGameJson.coverImage) {
          try {
            let image: string | Buffer = videoGameJson.coverImage;
            // vibrant can't handle webps, so conver to jpeg first.
            if (videoGameJson.coverImage.endsWith(".webp")) {
              const fetchImage = await fetch(videoGameJson.coverImage);
              const imageBuffer = await fetchImage.arrayBuffer();
              image = await sharp(imageBuffer).jpeg().toBuffer();
            }
            const palette = await Vibrant.from(image).getPalette();
            console.log("palette", palette.LightVibrant?.hex);
            videoGameJson.coverColor = palette.LightVibrant?.hex;
          } catch (e) {
            console.warn(
              `❌ [updateShelvedVideoGame] could not generate palette: ${e}`
            );
          }
        } else {
          console.warn(
            `❌ [updateShelvedVideoGame] missing cover image: ${videoGameJson.title}`
          );
        }
        break;
      default:
        console.warn(
          `❌ [updateShelvedVideoGame] unknown key to update: ${keyToUpdate}`
        );
    }
  }

  return true;
}

/** Returns whether or not the JSON was updated. */
async function updateShelvedItem(shelvedItem: ShelvedItem): Promise<boolean> {
  switch (shelvedItem.type) {
    case "book":
      return await updateShelvedBook(shelvedItem);
    case "tv":
      return await updateShelvedTv(shelvedItem);
    case "video-game":
      return await updateShelvedVideoGame(shelvedItem);
    default:
      const exhaustiveCheck: never = shelvedItem;
      console.warn(
        `❌ Unknown shelved item type: ${(exhaustiveCheck as ShelvedItem).type}`
      );
      return false;
  }
}

export const updateShelvesJson = cache(async () => {
  const shelvesJson = await getShelves();

  for (const shelfSlug in shelvesJson) {
    const shelf = shelvesJson[shelfSlug];
    // console.log(shelf);
    const shelfItems = shelf.items;
    let jsonUpdated = false;

    if (Array.isArray(shelfItems)) {
      for (const shelvedItem of shelfItems) {
        const itemUpdated = await updateShelvedItem(shelvedItem);
        if (!jsonUpdated && itemUpdated) {
          jsonUpdated = true;
        }
      }
    } else {
      // shelf has sections
      for (const section in shelfItems) {
        for (const shelvedItem of shelfItems[section]) {
          const itemUpdated = await updateShelvedItem(shelvedItem);
          if (!jsonUpdated && itemUpdated) {
            jsonUpdated = true;
          }
        }
      }
    }

    if (jsonUpdated) {
      const shelfToWrite: Partial<Shelf> = { ...shelf };
      delete shelfToWrite.slug;

      writeFileSync(
        `${process.cwd()}/src/data/library/${shelf.slug}.json`,
        JSON.stringify(shelfToWrite, null, 2)
      );
      console.log(
        `📝 [updateShelvesJson] updated JSON written to ${shelf.slug}.json.`
      );
    }
  }
});
