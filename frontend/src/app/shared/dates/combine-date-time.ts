export const combineDateTime = (date: Date, time: Date): Date => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  time.getHours(),
  time.getMinutes(),
);
