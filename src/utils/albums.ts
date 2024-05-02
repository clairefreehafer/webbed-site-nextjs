export enum AlbumSections {
  Photography = "photography",
  NewHorizons = "new horizons",
  NewLeaf = "new leaf",
  TearsOfTheKingdom = "tears of the kingdom",
  BreathOfTheWild = "breath of the wild"
};

export const ANIMAL_CROSSING_SECTIONS = [
  AlbumSections.NewHorizons, AlbumSections.NewLeaf
];

export const ZELDA_SECTIONS = [
  AlbumSections.TearsOfTheKingdom, AlbumSections.BreathOfTheWild
];

export function displayName(album: string) {
  if (album?.includes("-")) {
    return album.replaceAll("-", " ");
  }
  return album;
}

export function slugName(album: string) {
  if (album?.includes(" ")) {
    return album.replaceAll(" ", "-");
  }
  return album;
}