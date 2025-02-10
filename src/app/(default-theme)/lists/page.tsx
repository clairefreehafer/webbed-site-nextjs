import { getLists, slugify } from "@/utils";

const lists = getLists();

export default async function Page() {
  return (
    <section className="content">
      <p>
        my collection of lists, a la the days of del.icio.us and listography.
      </p>
      <ul>
        {lists.map(async (list) => {
          // TODO: move this into `getLists`
          const { title } = await import(`@/lists/${list}.mdx`);
          return (
            <li key={list}>
              <a href={`/lists/${slugify(list)}`}>{title}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
