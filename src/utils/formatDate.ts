export function formatDate(dateTime: string) {
  const manageDate = new Date(dateTime);
  const date = manageDate.toLocaleDateString("pt-BR");
  const time = manageDate.toLocaleTimeString("pt-BR");
  return `${date} ${time}`;
}
