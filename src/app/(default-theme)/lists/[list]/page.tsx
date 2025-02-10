import { getLists } from "@/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  const lists = getLists();
  return lists.map((list) => ({
    list,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ list: string }>;
}) {
  const { title } = await import(`@/lists/${(await params).list}.mdx`);
  return {
    title: `${title} – claire freehafer`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ list: string }>;
}) {
  const list = (await params).list;
  const { default: List, title } = await import(`@/lists/${list}.mdx`);

  return (
    <>
      <h3>{title}</h3>
      <section className="content">
        <List />
      </section>
    </>
  );
}
