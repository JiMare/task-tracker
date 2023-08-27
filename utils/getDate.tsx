export const getDate = (isodate: string) => {
  const date = new Date(isodate);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeek = dayNames[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return {
    formattedDate: `${day}. ${month}. ${year}`,
    dayOfWeek,
  };
};
