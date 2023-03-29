export const formatHours = (minutes: number) => {
  const toHours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  const formattedHours = toHours;
  return formattedHours;
};
