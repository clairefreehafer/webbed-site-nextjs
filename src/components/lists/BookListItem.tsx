import { BookListObject } from "types/lists";

export default function VideoGameListItem({ title }: BookListObject) {
  // TODO: include openlibrary link
  return <li key={title}>{title}</li>;
}
