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
