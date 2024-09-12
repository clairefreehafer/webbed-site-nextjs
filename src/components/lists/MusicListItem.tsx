import { MusicListObject } from "types/lists";

export default function VideoGameListItem({ title }: MusicListObject) {
  // TODO: include openlibrary link
  return <li key={title}>{title}</li>;
}
