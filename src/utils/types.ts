type MarkdownPage = {
  /** page content; cannot get element/component typing to cooperate */
  default: any;
  title: string;
  slug: string;
};

export type RecipePage = MarkdownPage & {
  ingredients: string[];
  type: "meal" | "cocktail";
  sourceUrl?: string;
};

export type ListPage = MarkdownPage & {
  tags?: string[];
};
