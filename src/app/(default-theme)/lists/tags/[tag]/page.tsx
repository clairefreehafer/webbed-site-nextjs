import { deslugify, slugify } from "@/utils";
import { generateTags } from "@/utils/lists";
import Link from "next/link";

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
      <h4>lists with {deslugify(tag)}</h4>
      <section className="content">
        <ul>
          {tags[deslugify(tag)].map((list) => (
            <li key={list.title}>
              <Link href={`/lists/${list.slug}`}>{list.title}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/lists/tags">more tags</Link>
        </p>
      </section>
    </>
  );
}
