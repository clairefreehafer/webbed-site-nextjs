import Link from "next/link";

import Tags from "@/components/default/tags";
import { RecipePage } from "@/utils/types";

export default function Recipe({ recipe }: { recipe: RecipePage }) {
  const { title, sourceUrl, ingredients, default: Page } = recipe;

  return (
    <>
      <div>
        <h3 className="recipe-heading">{title}</h3>
        {sourceUrl && (
          <p className="recipe-source">
            [{" "}
            <Link href={sourceUrl} target="_blank">
              source
            </Link>{" "}
            ]
          </p>
        )}
      </div>
      <section className="content">
        <Page />
      </section>
      <Tags tags={ingredients} linkPrefix="/recipes/ingredients/" />
    </>
  );
}
