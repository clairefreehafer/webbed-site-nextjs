import { redirect } from "next/navigation";

export default async function Page() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");

  redirect(`/photography/today/${mm}/${dd}`);
}
