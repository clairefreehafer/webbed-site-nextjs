import { deslugify, generateTags, slugify } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await generateTags();
  return Object.keys(tags).map((tag) => ({
    tag: slugify(tag),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tags = await generateTags();
  const tag = (await params).tag;
  return (
    <>
      <h4>{deslugify(tag)}</h4>
      <section className="content">
        <ul>
          {tags[deslugify(tag)].map((list) => (
            <li key={list.title}>
              <a href={`/lists/${list.slug}`}>{list.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
