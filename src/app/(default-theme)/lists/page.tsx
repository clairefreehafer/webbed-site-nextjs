import { getListPages } from "@/utils/lists";

export default async function Page() {
  const lists = await getListPages();
  return (
    <section className="content">
      <p>
        my collection of lists, a la the days of del.icio.us and listography.
      </p>
      <ul>
        {lists.map(async (list) => (
          <li key={list.title}>
            <a href={`/lists/${list.slug}`}>{list.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
