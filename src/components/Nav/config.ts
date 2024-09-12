export type NavLink = {
  pathname: string;
  name: string;
  image?: string;
  prefixWhenActive?: string;
  hide?: boolean | (() => boolean);
};

export const defaultNavLinks: NavLink[] = [
  {
    pathname: "/",
    name: "home",
  },
  {
    pathname: "/photography",
    name: "photography",
    prefixWhenActive: "📷 ",
  },
  {
    pathname: "/animal-crossing",
    name: "animal crossing",
  },
  {
    pathname: "/zelda",
    name: "zelda",
  },
  {
    pathname: process.env.STORYBOOK_URL || "",
    name: "storybook",
    hide: !!process.env.STORYBOOK_URL,
  },
  {
    pathname: "/admin",
    name: "admin",
    hide: process.env.NODE_ENV !== "development",
  },
];
