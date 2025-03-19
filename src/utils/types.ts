type MarkdownPage = {
  /** page content; cannot get element/component typing to cooperate */
  default: any; // eslint-disable-line
  title: string;
  path: string[];
};

export type RecipePage = MarkdownPage & {
  ingredients: string[];
  sourceUrl?: string;
  isCategory?: boolean;
  lastMade?: string;
};

export type ListPage = MarkdownPage & {
  tags?: string[];
  slug: string;
};
