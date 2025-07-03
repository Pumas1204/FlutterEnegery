"use client";
import { useEffect, useState } from "react";
import { message as antdMessage } from "antd";
import styles from "./charts.module.scss";
import TotalSaved from "./components/TotalSaved";
import PriceStatCard from "./components/PriceStatCard";
import PriceChart from "./components/PriceChart";
import PriceTable from "./components/PriceTable";
import { BackendAPI } from "power-grid/api/backendApi";

// Type for the price summary data
interface PriceSummaryData {
  ontario_price: { title: string; value: string; time: string };
  five_minute_price: { title: string; value: string; time: string };
  global_adjustment: { title: string; value: string; period: string };
  average_weighted_price: { title: string; value: string; period: string };
  hourly_uplift: { title: string; value: string; time: string };
}

// Initial state with placeholder values
const initialPriceStats: PriceSummaryData = {
  ontario_price: { title: "Ontario Price (HOEP)", value: "-", time: "-" },
  five_minute_price: { title: "5-Minute Price (MCP)", value: "-", time: "-" },
  global_adjustment: {
    title: "Global Adjustment 1st Estimate",
    value: "-",
    period: "-",
  },
  average_weighted_price: {
    title: "Average Weighted Price (March)",
    value: "-",
    period: "-",
  },
  hourly_uplift: {
    title: "Hourly Uplift Charge Estimate",
    value: "-",
    time: "-",
  },
};

export default function ChartsComp() {
  const [priceStats, setPriceStats] =
    useState<PriceSummaryData>(initialPriceStats);
  const [loading, setLoading] = useState(true);
  const totalSavedAmount = "40,206.20";
  const [messageApi, contextHolder] = antdMessage.useMessage();

  useEffect(() => {
    const fetchPriceSummary = async () => {
      setLoading(true);
      try {
        // Use BackendAPI directly for price summary
        const res = await BackendAPI.getPriceSummary();

        if (res && typeof res === "object") {
          // Validate and transform the data
          const transformedData: PriceSummaryData = {
            ontario_price: {
              title: res.ontario_price?.title || "Ontario Price (HOEP)",
              value: res.ontario_price?.value || "-",
              time: res.ontario_price?.time || "-",
            },
            five_minute_price: {
              title: res.five_minute_price?.title || "5-Minute Price (MCP)",
              value: res.five_minute_price?.value || "-",
              time: res.five_minute_price?.time || "-",
            },
            global_adjustment: {
              title:
                res.global_adjustment?.title ||
                "Global Adjustment 1st Estimate",
              value: res.global_adjustment?.value || "-",
              period: res.global_adjustment?.period || "-",
            },
            average_weighted_price: {
              title:
                res.average_weighted_price?.title ||
                "Average Weighted Price (March)",
              value: res.average_weighted_price?.value || "-",
              period: res.average_weighted_price?.period || "-",
            },
            hourly_uplift: {
              title:
                res.hourly_uplift?.title || "Hourly Uplift Charge Estimate",
              value: res.hourly_uplift?.value || "-",
              time: res.hourly_uplift?.time || "-",
            },
          };
          setPriceStats(transformedData);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error: any) {
        console.error("Error fetching price summary:", error);
        messageApi.error(error.message || "Failed to load price summary data.");
        setPriceStats(initialPriceStats);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceSummary();
  }, [messageApi]);

  return (
    <div className={styles.chartsContainer}>
      {contextHolder}
      {/* Top Header */}
      <TotalSaved amount={totalSavedAmount} label="Total Amount Saved" />

      {/* Stats Cards Row */}
      <div className={styles.statsRow}>
        <PriceStatCard
          title={priceStats.ontario_price.title}
          value={loading ? "Loading..." : priceStats.ontario_price.value}
          timeLabel={loading ? "" : priceStats.ontario_price.time}
        />
        <PriceStatCard
          title={priceStats.five_minute_price.title}
          value={loading ? "Loading..." : priceStats.five_minute_price.value}
          timeLabel={loading ? "" : priceStats.five_minute_price.time}
        />
        <PriceStatCard
          title={priceStats.global_adjustment.title}
          value={loading ? "Loading..." : priceStats.global_adjustment.value}
          timeLabel={loading ? "" : priceStats.global_adjustment.period}
        />
        <PriceStatCard
          title={priceStats.average_weighted_price.title}
          value={
            loading ? "Loading..." : priceStats.average_weighted_price.value
          }
          timeLabel={loading ? "" : priceStats.average_weighted_price.period}
        />
        <PriceStatCard
          title={priceStats.hourly_uplift.title}
          value={loading ? "Loading..." : priceStats.hourly_uplift.value}
          timeLabel={loading ? "" : priceStats.hourly_uplift.time}
        />
      </div>

      {/* Price Chart Section */}
      <PriceChart />

      {/* Data Table Section */}
      <PriceTable />
    </div>
  );
}
