"use client";
import dynamic from "next/dynamic";
import { ClientRenderComp } from "components";

const ClientPanel = dynamic(() => import("./ClientPanel"), { ssr: false });

export default function ClientPanelWrapper() {
  return (
    <ClientRenderComp>
      <ClientPanel />
    </ClientRenderComp>
  );
}
