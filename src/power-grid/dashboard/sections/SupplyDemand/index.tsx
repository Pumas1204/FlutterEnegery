"use client";
import { useState, useEffect } from "react";
import { App } from "antd";
import ChartSection from "../../components/ChartSection";
import { PeakPredictionAPI } from "power-grid/api/peakPredictionApi";

interface ApiDataPoint {
  timestamp: string;
  demand: string;
  supply: string;
  price: string;
  source: string;
}

interface TooltipData {
  label: string;
  value: string;
}

interface TooltipDataMapping {
  [timestamp: string]: TooltipData[];
}

const SupplyDemand = () => {
  const [chartDatasets, setChartDatasets] = useState<any[]>([]);
  const [tooltipDataMapping, setTooltipDataMapping] =
    useState<TooltipDataMapping>({});
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("today"); // State for time filter
  const { message } = App.useApp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PeakPredictionAPI.getSupplyDemand();
        const apiData: ApiDataPoint[] = response.results || [];

        // Process data for chart
        const processedSupplyData = apiData.map((item: ApiDataPoint) => ({
          timestamp: item.timestamp,
          value: item.supply,
        }));
        const processedDemandData = apiData.map((item: ApiDataPoint) => ({
          timestamp: item.timestamp,
          value: item.demand,
        }));

        const datasets = [
          {
            label: "Supply",
            data: processedSupplyData,
            color: "#1ED087",
            dataKey: "supplyValue",
          },
          {
            label: "Demand",
            data: processedDemandData,
            color: "#90EE90",
            dataKey: "demandValue",
          },
        ];
        setChartDatasets(datasets);

        // Process data for tooltip
        const mapping: TooltipDataMapping = {};
        apiData?.forEach((item: ApiDataPoint) => {
          mapping[item.timestamp] = [
            { label: "Demand", value: item.demand },
            { label: "Supply", value: item.supply },
            { label: "Price", value: item.price },
            { label: "Source", value: item.source },
          ];
        });
        setTooltipDataMapping(mapping);
      } catch (_error) {
        message.error("Failed to load supply/demand data.");
        console.log(_error);
        setChartDatasets([]); // Clear data on error
        setTooltipDataMapping({});
      }
    };

    fetchData();
  }, [selectedTimeFilter, message]); // Refetch when selectedTimeFilter changes

  const handleTimeChange = (newTimeOption: string) => {
    // Map display option to API query parameter
    const timeFilterMap: { [key: string]: string } = {
      Today: "today",
      Yesterday: "yesterday",
      "Last Week": "last_week",
      "Last Month": "last_month",
    };
    const apiFilter = timeFilterMap[newTimeOption] || "today"; // Default to today
    setSelectedTimeFilter(apiFilter);
  };

  const legendItems = [
    { label: "Demand", color: "#90EE90" },
    { label: "Supply", color: "#1ED087" },
  ];

  // Render ChartSection with loading state handled internally by ChartSection
  return (
    <ChartSection
      title="Supply/Demand"
      subtitle="View your team's trades and transactions."
      timeOptions={["Today", "Yesterday", "Last Week", "Last Month"]}
      datasets={chartDatasets} // Pass the processed datasets
      tooltipDataMapping={tooltipDataMapping}
      tooltipTitle="Data Point Details"
      legendItems={legendItems}
      onTimeChange={handleTimeChange} // Pass handler to update filter
    />
  );
};

export default SupplyDemand;
