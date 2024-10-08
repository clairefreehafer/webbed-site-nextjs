import { GrassDateRange, astrologyDateRanges } from "../types/animalCrossing";

// TODO: find a better way to handle this.
// const tagAlbumNameMapping: Record<string, string> = {
//   "an old friend": "rover",
// };

// export const getAlbumPhotos = cache(
//   async (albumName: string, section: string) => {
//     // TODO: type this better
//     let photos: (Partial<Photo> & { album?: Album | null })[] = [];

//     const tags = await prisma.tag.findMany({
//       where: { parentName: "animal crossing" },
//       select: { name: true },
//     });

//     const flattenedTags = tags.map((tag) => tag.name);

//     if (flattenedTags.includes(albumName)) {
//       photos = await prisma.photo.findMany({
//         include: { tags: true, album: true },
//         where: {
//           tags: {
//             some: {
//               name: tagAlbumNameMapping[albumName] || albumName,
//             },
//           },
//         },
//       });
//     } else {
//       photos = await prisma.photo.findMany({
//         where: {
//           albumName,
//         },
//         orderBy: {
//           captureDate: "asc",
//         },
//         select: {
//           id: true,
//           url: true,
//           album: true,
//         },
//       });
//     }

//     return photos;
//   },
// );

export function getGrassDateRange(date = new Date()): GrassDateRange {
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
      return "" as GrassDateRange;
  }
}

export function getAstrologyDateRange(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let key: keyof typeof astrologyDateRanges;

  switch (month) {
    case 1:
      key = day <= 19 ? "capricorn" : "aquarius";
      break;
    case 2:
      key = day <= 18 ? "aquarius" : "pisces";
      break;
    case 3:
      key = day <= 20 ? "pisces" : "aries";
      break;
    case 4:
      key = day <= 19 ? "aries" : "taurus";
      break;
    case 5:
      key = day <= 20 ? "taurus" : "gemini";
      break;
    case 6:
      key = day <= 21 ? "gemini" : "cancer";
      break;
    case 7:
      key = day <= 22 ? "cancer" : "leo";
      break;
    case 8:
      key = day <= 22 ? "leo" : "virgo";
      break;
    case 9:
      key = day <= 22 ? "virgo" : "libra";
      break;
    case 10:
      key = day <= 23 ? "libra" : "scorpio";
      break;
    case 11:
      key = day <= 22 ? "scorpio" : "sagittarius";
      break;
    case 12:
      key = day <= 21 ? "sagittarius" : "capricorn";
      break;
    default:
      throw new Error("month value out of bounds for grass date range.");
  }

  return {
    name: key,
    dateRange: astrologyDateRanges[key],
  };
}
