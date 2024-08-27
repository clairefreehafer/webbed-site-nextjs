export type GrassShape = "circle" | "square" | "triangle";

export type GrassDateRange =
  | "1210-0224"
  | "0225-0331"
  | "0401-0722"
  | "0723-0915"
  | "0916-0930"
  | "1001-1015"
  | "1016-1029"
  | "1030-1112"
  | "1113-1128"
  | "1129-1209";

export const astrologyDateRanges = {
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
