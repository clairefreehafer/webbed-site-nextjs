import { MusicListObject } from "@utils/lists";

export default function VideoGameListItem({ title }: MusicListObject) {
  // TODO: include openlibrary link
  return <li key={title}>{title}</li>;
}
