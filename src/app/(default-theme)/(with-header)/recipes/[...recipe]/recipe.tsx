import { MDXComponents } from "mdx/types";
import Link from "next/link";
import { JSX } from "react";

import Tags from "@/components/default/tags";
import { RecipePage } from "@/utils/types";

const components: MDXComponents = {
  ol: ({ children, ...props }: { children: JSX.Element[] }) => {
    return (
      <ol {...props}>
        {children.map((child, idx) => {
          if (typeof child !== "string") {
            return (
              <div className="list-item-wrapper" key={idx}>
                <input type="checkbox" />
                {child}
              </div>
            );
          }
        })}
      </ol>
    );
  },
};

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
        <Page components={components} />
      </section>
      <Tags tags={ingredients} linkPrefix="/recipes/ingredients/" />
    </>
  );
}
