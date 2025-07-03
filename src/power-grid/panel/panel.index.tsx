"use client";
import { PATH } from "data";
import DashboardComp from "../dashboard/dashboard.index";
import ChartsComp from "../charts/charts.index";
import AlarmsComp from "../alarms/alarms.index";
import { usePathname } from "next/navigation";
import PanelLayout from "./PanelLayout";
import { memo } from "react";

const PanelContent = memo(function PanelContent() {
  const pathname = usePathname();

  if (pathname === PATH.charts().path) {
    return <ChartsComp />;
  }
  if (pathname === PATH.alarms().path) {
    return <AlarmsComp />;
  }
  return <DashboardComp />;
});

export default function PanelComp() {
  return (
    <PanelLayout>
      <PanelContent />
    </PanelLayout>
  );
}
