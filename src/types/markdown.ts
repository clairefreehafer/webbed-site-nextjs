type MarkdownPage = {
  /** page content; cannot get element/component typing to cooperate */
  default: any;
  title: string;
  path: string;
};

export type RecipePage = MarkdownPage & {
  category: string;
  ingredients: string[];
  sourceUrl?: string;
  lastMade?: string;
};

export type ListPage = MarkdownPage & {
  tags?: string[];
  slug: string;
};
