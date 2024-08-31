import { PodcastListObject } from "@utils/lists";

export default function VideoGameListItem({ episodeTitle }: PodcastListObject) {
  // TODO: include openlibrary link
  return <li key={episodeTitle}>{episodeTitle}</li>;
}
