import { BookListObject } from "@utils/lists";

export default function VideoGameListItem({ title }: BookListObject) {
  // TODO: include openlibrary link
  return <li key={title}>{title}</li>;
}
