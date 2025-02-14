import Tags from "@/components/default/tags";
import { getListPages } from "@/utils/lists";

export const dynamicParams = false;

export async function generateStaticParams() {
  const lists = await getListPages();
  return lists.map((list) => ({
    list: list.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ list: string }>;
}) {
  const { title } =
    (await getListPages()).find(
      async (listData) => (await params).list === listData.slug
    ) ?? {};
  return {
    title: `${title} – claire freehafer`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ list: string }>;
}) {
  const slug = (await params).list;
  const lists = await getListPages();
  const currentList = lists.find((list) => slug === list.slug);

  if (!currentList) {
    return `Could not find list ${slug}`;
  }
  const { default: List, title, tags } = currentList;

  return (
    <>
      <h3>{title}</h3>
      <section className="content">
        <List />
      </section>
      <Tags tags={tags} linkPrefix="/lists/tags/" />
    </>
  );
}
