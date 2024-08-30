import { MusicListObject } from "@utils/lists/types";

export default function VideoGameListItem({ title }: MusicListObject) {
  // TODO: include openlibrary link
  return <li key={title}>{title}</li>;
}
