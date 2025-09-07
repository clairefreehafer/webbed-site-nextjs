import { noRobots } from "@/utils";
import { getListPages } from "@/utils/lists";

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
  const listSlug = (await params).list;
  const lists = await getListPages();
  const currentList = lists.find((list) => listSlug === list.slug);

  if (!currentList) {
    return {
      title: "lists",
      robots: noRobots,
    };
  }
  return {
    title: currentList.title,
    robots: noRobots,
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
  const { default: List, title } = currentList;

  return (
    <>
      <h3>{title}</h3>
      <section className="content list">
        <List />
      </section>
    </>
  );
}
