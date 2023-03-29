export function statusAssets(status: string) {
  if (status === "inAlert") return "warning";

  if (status === "inDowntime") return "secondary";

  if (status === "inOperation") return "success";
}
