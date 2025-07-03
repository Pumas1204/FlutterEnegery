"use client";
import styles from "./dashboard.module.scss";
import MarketDemand from "./sections/MarketDemand";
import SupplyDemand from "./sections/SupplyDemand";
import GeneratorAvailability from "./sections/GeneratorAvailability";

export default function DashboardComp() {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.sectionHeader}>Dashboard</h1>
      <p className={styles.sectionSubtitle}>
        View your team's trades and transactions.
      </p>

      <MarketDemand />
      <SupplyDemand />
      <GeneratorAvailability />
    </div>
  );
}
