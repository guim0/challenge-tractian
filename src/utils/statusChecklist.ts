export function statusChecklist(status: string) {
  if (status === "in progress") return "secondary";

  if (status === "completed") return "success";
}
