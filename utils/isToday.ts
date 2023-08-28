import { getDate } from "./getDate";

export const isToday = (isodate: string): boolean => {
 const today = new Date();
 const inputDateFormatted = getDate(isodate).formattedDate;
 const todayFormatted = getDate(today.toISOString()).formattedDate;

 return inputDateFormatted === todayFormatted;
};
