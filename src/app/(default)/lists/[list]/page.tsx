import fs from "fs";
import path from "path";

function getLists() {
  const lists = fs.readdirSync(path.join(process.cwd(), "src", "lists"));
  // return sans file extension
  return lists.map((list) => list.split('.')[0]);
}

export const dynamicParams = false;

export function generateStaticParams() {
  const lists = getLists();
  return lists.map((list) => ({
    list
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ list: string }>}) {
  const { title } = await import(`@/lists/${(await params).list}.mdx`);
  return {
    title: `${title} – claire freehafer`
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ list: string }>
}) {
  const list = (await params).list
  const { default: Post } = await import(`@/lists/${list}.mdx`);

  return <Post />
}
