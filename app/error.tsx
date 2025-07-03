"use client";
export const dynamic = "force-dynamic";
import { BaseComp } from "components";
import Error500Comp from "power-grid/500/500.index";
import { metaTag } from "scripts";

export async function generateMetadata() {
  return metaTag({ title: "پل", description: "پل" });
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <BaseComp>
      <Error500Comp error={error} reset={reset} />
    </BaseComp>
  );
}
