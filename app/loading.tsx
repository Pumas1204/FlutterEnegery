export const dynamic = "force-dynamic";
import LoadingComp from "power-grid/loading/loading.index";
import { BaseComp } from "components";
import { metaTag } from "scripts";

export async function generateMetadata() {
  return metaTag({ title: "پل", description: "پل" });
}

export default function LoadingPage() {
  return (
    <BaseComp>
      <LoadingComp />
    </BaseComp>
  );
}
