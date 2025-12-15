import Link from "next/link";

import LastMade from "@/components/default/last-made";
import { deslugify } from "@/utils";
import { RecipePage } from "@/utils/types";

type Props = {
  category: string;
  recipes: Record<string, RecipePage[]>;
};

export default function ListWithSubcategories({ category, recipes }: Props) {
  return Object.keys(recipes).map((subcategory) => (
    <div
      key={subcategory}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <h4>{deslugify(subcategory)}</h4>
      <ul>
        {recipes[subcategory].map((recipe) => (
          <li key={recipe.path}>
            <Link href={`/recipes/${category}/${recipe.path}`}>
              {recipe.title}
            </Link>

            <LastMade lastMade={recipe.lastMade} />
          </li>
        ))}
      </ul>
    </div>
  ));
}
