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
};

export function getGrassDateRange(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (month) {
    case 1:
      return "1210-0224";
    case 2:
      return day <= 24 ? "1210-0224" : "0225-0331";
    case 3:
      return "0225-0331";
    case 4:
    case 5:
    case 6:
      return "0401-0722";
    case 7:
      return day <= 22 ? "0401-0722" : "0723-0915";
    case 8:
      return "0723-0915";
    case 9:
      return day <= 15 ? "0723-0915" : "0916-0930";
    case 10:
      if (day <= 15) {
        return "1001-1015";
      } else if (day <= 29) {
        return "1016-1029";
      }
      return "1030-1112";
    case 11:
      if (day <= 12) {
        return "1030-1112";
      } else if (day <= 28) {
        return "1113-1128";
      }
      return "1129-1209";
    case 12:
      return day <= 9 ? "1129-1209" : "1210-0224";
    default:
      console.error("month value out of bounds for grass date range.");
      return "0401-0722";
  }
}
