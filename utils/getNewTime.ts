export const getNewTime = (oldTime: string, addedTime: number) => {
  const [hours1, minutes1] = oldTime.split(":").map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = Math.floor(addedTime / 60);

  const sum = totalMinutes1 + totalMinutes2;

  const resultHours = Math.floor(sum / 60);
  const resultMinutes = sum % 60;

  return `${String(resultHours).padStart(2, "0")}:${String(
    resultMinutes
  ).padStart(2, "0")}`;
};
