export type GrassShape = "circle" | "square" | "triangle";

export type DateRange =
  "1210-0224" |
  "0225-0331" |
  "0401-0722" |
  "0723-0915" |
  "0916-0930" |
  "1001-1015" |
  "1016-1029" |
  "1030-1112" |
  "1113-1128" |
  "1129-1209";

export const grassColors: Record<DateRange, string> = {
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

export function getDateRange(date: Date = new Date()) {
  const month = date.getMonth();
  const day = date.getDate();

  let range: DateRange = "" as DateRange;

  switch (month) {
    case 1:
      range = "1210-0224";
      break;
    case 2:
      range = day <= 24 ? "1210-0224" : "0225-0331";
      break;
    case 3:
      range = "0225-0331";
      break;
    case 4:
    case 5:
    case 6:
      range = "0401-0722";
      break;
    case 7:
      range = day <= 22 ? "0401-0722" : "0723-0915";
      break;
    case 8:
      range = "0723-0915";
      break;
    case 9:
      range = day <= 15 ? "0723-0915" : "0916-0930";
      break;
    case 10:
      if (day <= 15) {
        range = "1001-1015";
      } else if (day <= 29) {
        range = "1016-1029";
      } else {
        range = "1030-1112";
      }
      break;
    case 11:
      if (day <= 12) {
        range = "1030-1112";
      } else if (day <= 28) {
        range = "1113-1128";
      } else {
        range = "1129-1209";
      }
      break;
    case 12:
      range = day <= 9 ? "1129-1209" : "1210-0224";
      break;
    default:
      console.error("something went weird!");
  }

  return range;
}
