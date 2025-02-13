import { slugify } from "@/utils";

export default function Tags({
  heading = "see more",
  linkPrefix,
  tags,
}: {
  heading?: string;
  linkPrefix: string;
  tags?: string[];
}) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <section className="tags">
      <h4>{heading}</h4>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`${linkPrefix}${slugify(tag)}`}>{tag}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
