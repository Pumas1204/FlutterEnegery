export const dynamic = "force-dynamic";
import { BaseComp } from "components";
import Error404Comp from "power-grid/404/404.index";
import { metaTag } from "scripts";

export async function generateMetadata() {
  return metaTag({ title: "Power Grid", description: "Power Grid" });
}

export default function NotFound() {
  return (
    <BaseComp>
      <Error404Comp />
    </BaseComp>
  );
}
