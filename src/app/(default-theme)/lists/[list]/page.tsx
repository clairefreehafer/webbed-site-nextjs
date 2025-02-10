import { getLists } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const lists = await getLists();
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
    (await getLists()).find(
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
  const { default: List, title } =
    (await getLists()).find(
      async (listData) => (await params).list === listData.slug
    ) ?? {};

  return (
    <>
      <h3>{title}</h3>
      <section className="content">
        <List />
      </section>
    </>
  );
}
