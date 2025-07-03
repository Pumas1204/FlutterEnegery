import { PATH } from "data";
import { redirect, RedirectType } from "next/navigation";
import { getUser } from "./_lib";

export const dynamic = "force-dynamic";

async function LandingPage() {
  const profile = await getUser();
  if (!profile) redirect(PATH.login, RedirectType.replace);
  else redirect(PATH.panel.path, RedirectType.replace);
}

export default LandingPage;
