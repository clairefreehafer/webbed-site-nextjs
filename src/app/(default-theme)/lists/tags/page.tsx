import { slugify } from "@/utils";
import { generateTags } from "@/utils/lists";

export default async function Page() {
  const tags = await generateTags();
  return (
    <>
      <h3>list tags</h3>
      <section className="content">
        <ul>
          {Object.keys(tags)
            .sort()
            .map((tag) => (
              <li key={tag}>
                <a href={`/lists/tags/${slugify(tag)}`}>{tag}</a>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
