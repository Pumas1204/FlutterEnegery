"use client";
import { useState, useEffect } from "react";
import { App } from "antd";
import ChartSection from "../../../dashboard/components/ChartSection";
// import { BackendAPI } from "power-grid/api/backendApi";

interface PriceApiDataPoint {
  timestamp: string;
  price: string;
  prediction: string;
  source: string;
}

interface TooltipDataMapping {
  [timestamp: string]: Array<{ label: string; value: string }>;
}

const generateMockData = (timeFilter: string): PriceApiDataPoint[] => {
  const now = new Date();
  let dataPoints: number;
  let unit: "hour" | "day";

  switch (timeFilter) {
    case "last_7_days":
      dataPoints = 7;
      unit = "day";
      break;
    case "last_30_days":
      dataPoints = 30;
      unit = "day";
      break;
    case "last_24_hours":
    default:
      dataPoints = 24;
      unit = "hour";
      break;
  }

  const mockData: PriceApiDataPoint[] = [];
  for (let i = dataPoints - 1; i >= 0; i--) {
    const timestamp = new Date(now);
    if (unit === "hour") {
      timestamp.setHours(now.getHours() - i);
    } else {
      timestamp.setDate(now.getDate() - i);
    }

    const basePrice = 50 + Math.random() * 20;
    const price =
      basePrice +
      Math.sin(i / (dataPoints / Math.PI)) * 10 +
      (Math.random() - 0.5) * 4;
    const prediction = price * (1 + (Math.random() - 0.5) * 0.2);

    mockData.push({
      timestamp: timestamp.toISOString(),
      price: price.toFixed(2),
      prediction: prediction.toFixed(2),
      source: "Mock Data",
    });
  }
  return mockData;
};

const PriceChart = () => {
  const [chartDatasets, setChartDatasets] = useState<any[]>([]);
  const [tooltipDataMapping, setTooltipDataMapping] =
    useState<TooltipDataMapping>({});
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("last_24_hours");
  const { message } = App.useApp();

  useEffect(() => {
    const fetchData = async (timeFilter: string) => {
      try {
        // const apiUrl = `?time_filter=${timeFilter}`;
        // const response = await BackendAPI.getPriceChart(apiUrl);
        const apiData = generateMockData(timeFilter);

        if (!apiData || apiData.length === 0) {
          setChartDatasets([]);
          setTooltipDataMapping({});
          message.info("No price chart data found for the selected period.");
          return;
        }

        // Process data for chart lines
        const processedPriceData = apiData.map((item: PriceApiDataPoint) => ({
          timestamp: item.timestamp,
          value: parseFloat(item.price.replace(/[^0-9.]+/g, "")) || 0,
        }));
        const processedPredictionData = apiData.map(
          (item: PriceApiDataPoint) => ({
            timestamp: item.timestamp,
            value: parseFloat(item.prediction.replace(/[^0-9.]+/g, "")) || 0,
          }),
        );

        const datasets = [
          {
            label: "Price",
            data: processedPriceData,
            color: "#1ED087",
            dataKey: "priceValue",
          },
          {
            label: "Prediction",
            data: processedPredictionData,
            color: "#90EE90",
            dataKey: "predictionValue",
            strokeDasharray: "5 5",
          },
        ];
        setChartDatasets(datasets);

        // Process data for tooltip
        const mapping: TooltipDataMapping = {};
        apiData.forEach((item: PriceApiDataPoint) => {
          mapping[item.timestamp] = [
            {
              label: "Price",
              value: `$${item.price.replace(/[^0-9.]+/g, "")}`,
            },
            {
              label: "Prediction",
              value: `$${item.prediction.replace(/[^0-9.]+/g, "")}`,
            },
            { label: "Source", value: item.source },
          ];
        });
        setTooltipDataMapping(mapping);
      } catch (error: any) {
        console.error("Error fetching price chart data:", error);
        message.error(error.message || "Failed to load price chart data.");
        setChartDatasets([]);
        setTooltipDataMapping({});
      }
    };

    fetchData(selectedTimeFilter);
  }, [selectedTimeFilter, message]);

  const handleTimeChange = (newTimeOption: string) => {
    const timeFilterMap: { [key: string]: string } = {
      "Last 24 hours": "last_24_hours",
      "Last 7 days": "last_7_days",
      "Last 30 days": "last_30_days",
    };
    const apiFilter = timeFilterMap[newTimeOption] || "last_24_hours";
    setSelectedTimeFilter(apiFilter);
  };

  const legendItems = [
    { label: "Prediction", color: "#90EE90" },
    { label: "Price", color: "#1ED087" },
  ];

  return (
    <ChartSection
      title="Price"
      subtitle="View your team's trades and transactions."
      timeOptions={["Last 24 hours", "Last 7 days", "Last 30 days"]}
      datasets={chartDatasets}
      tooltipDataMapping={tooltipDataMapping}
      tooltipTitle="Price Details"
      legendItems={legendItems}
      onTimeChange={handleTimeChange}
    />
  );
};

export default PriceChart;
