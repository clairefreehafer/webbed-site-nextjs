export enum AlbumTypes {
  Default = "default",
  Tag = "tag",
  Smugmug = "smugmug",
}

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
