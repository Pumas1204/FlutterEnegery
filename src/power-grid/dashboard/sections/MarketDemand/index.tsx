"use client";
import { useEffect, useState } from "react";
import { message as antdMessage } from "antd";
import StatsCard from "../../components/StatsCard";
import StatusCard from "../../components/StatusCard";
import { PowerGridIcon, BatteryIcon } from "../../components/Icons";
import styles from "../../dashboard.module.scss";
import { PeakPredictionAPI } from "power-grid/api/peakPredictionApi";
import { BackendAPI } from "power-grid/api/backendApi";

// Define a more specific type for the expected API response
interface MarketDemandData {
  market_demand: { value: string; time: string };
  five_minute_demand: { value: string; time: string };
  projected_peak: { value: string; time: string };
  projected_minimum: { value: string; time: string };
  // Add operating_reserve_requirement if it comes from API
}

// Default state matching the structure but with initial empty/loading values
const initialData: MarketDemandData = {
  market_demand: { value: "-", time: "-" },
  five_minute_demand: { value: "-", time: "-" },
  projected_peak: { value: "-", time: "-" },
  projected_minimum: { value: "-", time: "-" },
};

const MarketDemand = () => {
  const [data, setData] = useState<MarketDemandData>(initialData);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = antdMessage.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch from both APIs in parallel
        const [peakRes, backendRes] = await Promise.all([
          PeakPredictionAPI.getDemandSummary(),
          BackendAPI.getDemandSummary(),
        ]);
        setData({
          market_demand: peakRes?.market_demand ?? initialData.market_demand,
          five_minute_demand:
            backendRes?.five_minute_demand ?? initialData.five_minute_demand,
          projected_peak: peakRes?.projected_peak ?? initialData.projected_peak,
          projected_minimum:
            peakRes?.projected_minimum ?? initialData.projected_minimum,
        });
      } catch (_error) {
        messageApi.error(
          "Failed to load market demand data. Please try again later.",
        );
        console.log(_error);
        setData(initialData); // Reset data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [messageApi]); // Fetch only on initial mount

  // Operating reserve is hardcoded in the original image/component
  const operatingReserve = {
    value: "1,618",
    time: "at 05:00 a.m. EST",
  };

  return (
    <>
      {contextHolder}
      <div className={styles.statusCardsContainer}>
        <StatsCard
          title="Market Demand"
          value={loading ? "Loading..." : data.market_demand.value}
          time={loading ? "" : data.market_demand.time}
        />
        <StatusCard
          title="Current Status" // Corrected spelling from "Curent"
          options={[
            {
              label: "Power Grid",
              active: true,
              icon: <PowerGridIcon color="white" />,
            },
            { label: "Battery", active: false, icon: <BatteryIcon /> },
          ]}
        />
        <StatusCard
          title="Next Hour Production"
          options={[
            { label: "Power Grid", active: false, icon: <PowerGridIcon /> },
            {
              label: "Battery",
              active: true,
              icon: <BatteryIcon color="white" />,
            },
          ]}
        />
      </div>

      <div className={styles.statsCardsContainer}>
        <StatsCard
          title="5-Minute Market Demand"
          value={loading ? "Loading..." : "30.8MW"}
          time={loading ? "" : "last 5 minutes"}
          // time={loading ? "" : data.five_minute_demand.time}
          // value={loading ? "Loading..." : data.five_minute_demand.value}
        />
        <StatsCard
          title="Today's Projected Peak"
          value={loading ? "Loading..." : data.projected_peak.value}
          time={loading ? "" : data.projected_peak.time}
        />
        <StatsCard
          title="Today's Projected Minimum"
          value={loading ? "Loading..." : data.projected_minimum.value}
          time={loading ? "" : data.projected_minimum.time}
        />
        <StatsCard
          title="Operating Reserve Requirement"
          value={operatingReserve.value} // Keep using static value
          time={operatingReserve.time}
        />
      </div>
    </>
  );
};

export default MarketDemand;
