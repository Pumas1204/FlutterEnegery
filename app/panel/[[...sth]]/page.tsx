import { metaTag } from "scripts";
import { BaseComp } from "components";
import { getUser } from "lib";
import { PATH } from "data";
import { redirect, RedirectType } from "next/navigation";
import ClientPanelWrapper from "power-grid/panel/ClientPanelWrapper";

export async function generateMetadata() {
  return metaTag({
    title: "Power Grid | Business panel",
    description: "Power Grid | Business panel",
  });
}

export default async function BasePage() {
  const profile = await getUser();
  if (!profile) redirect(PATH.login, RedirectType.replace);
  return (
    <BaseComp profile={profile} noLayout>
      <ClientPanelWrapper />
    </BaseComp>
  );
}
