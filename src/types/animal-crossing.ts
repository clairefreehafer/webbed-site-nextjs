export type GrassShape = "circle" | "square" | "triangle";

export const GRASS_BACKGROUND_COLORS = {
  "1210-0224": "rgb(189, 215, 238)",
  "0225-0331": "rgb(31, 140, 57)",
  "0401-0722": "rgb(0, 131, 90)",
  "0723-0915": "rgb(19, 115, 82)",
  "0916-0930": "rgb(73, 123, 49)",
  "1001-1015": "rgb(132, 123, 58)",
  "1016-1029": "rgb(148, 99, 99)",
  "1030-1112": "rgb(148, 90, 98)",
  "1113-1128": "rgb(132, 90, 82)",
  "1129-1209": "rgb(99, 81, 82)",
} as const;

export const ASTROLOGY_DATE_RANGES = {
  capricorn: "1222-0119",
  aquarius: "0120-0218",
  pisces: "0219-0320",
  aries: "0321-0419",
  taurus: "0420-0520",
  gemini: "0521-0621",
  cancer: "0622-0722",
  leo: "0723-0822",
  virgo: "0823-0922",
  libra: "0923-1023",
  scorpio: "1024-1122",
  sagittarius: "1123-1221",
} as const;

export type NookphoneConfig = {
  slug: string;
  icon: string;
};

export type AnimalCrossingTags = Record<string, string[]>;

export type ScheduleData = {
  month: string;
  themes: {
    name: string;
    campers: {
      name: string;
      cookie?: string;
    }[];
  }[];
}[];
