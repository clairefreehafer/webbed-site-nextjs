import { BookListObject } from "@utils/lists/types";

export default function VideoGameListItem({ title }: BookListObject) {
  // TODO: include openlibrary link
  return <li key={title}>{title}</li>;
}
