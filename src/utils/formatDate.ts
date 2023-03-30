export function formatDate(dateTime: string) {
  const manageDate = new Date(dateTime);
  const date = manageDate.toLocaleDateString("en-US");
  const time = manageDate.toLocaleTimeString("en-US");
  return `${date} - ${time}`;
}
