import { MusicListObject } from "types/lists";

export default function MusicListItem({ song }: MusicListObject) {
  // TODO: include openlibrary link
  return <li key={song}>{song}</li>;
}
