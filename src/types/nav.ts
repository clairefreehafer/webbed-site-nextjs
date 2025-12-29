type RootLink = {
  text: string;
  href: `/${string}`;
  /** for default theme. */
  scribbleText?: string;
  /** for animal crossing theme. */
  animalCrossingIcon?: string;
};

export const ROOT_LINKS: RootLink[] = [
  {
    text: "home",
    href: "/",
    scribbleText: "hm",
    animalCrossingIcon: "animal-crossing/icons/hhn",
  },
  {
    text: "art",
    href: "/art",
    scribbleText: "r",
    animalCrossingIcon: "animal-crossing/icons/camera",
  },
  {
    text: "recipes",
    href: "/recipes",
    scribbleText: "rp",
    animalCrossingIcon: "animal-crossing/icons/recipes",
  },
  {
    text: "lists",
    href: "/lists",
    scribbleText: "ls",
    animalCrossingIcon: "animal-crossing/icons/lists",
  },
  {
    text: "library",
    href: "/library",
    scribbleText: "lir",
    animalCrossingIcon: "animal-crossing/icons/book",
  },
];
