"use client";
import { useState, useEffect } from "react";
import { App } from "antd";
import ChartSection from "../../components/ChartSection";
// import { BackendAPI } from "power-grid/api/backendApi";

interface GeneratorApiDataPoint {
  id: number;
  timestamp: string;
  biofuel: string;
  gas: string;
  hydro: string;
  nuclear: string;
  other: string;
  solar: string;
  wind: string;
  total: string;
  hourly_imports: string;
  hourly_exports: string;
}

interface TooltipData {
  label: string;
  value: string;
}

interface TooltipDataMapping {
  [timestamp: string]: TooltipData[];
}

// Define colors and order based on the image - moved outside component
const generatorConfig = [
  { key: "total", label: "Total", color: "#1ED087" },
  { key: "nuclear", label: "Nuclear", color: "#DAA520" },
  { key: "hydro", label: "Hydro", color: "#FFD700" },
  { key: "wind", label: "Wind", color: "#90EE90" },
  { key: "gas", label: "Gas", color: "#87CEEB" },
  { key: "solar", label: "Solar", color: "#9370DB" },
  { key: "biofuel", label: "Biofuel", color: "#FF69B4" },
  { key: "hourly_imports", label: "Hourly Imports", color: "#FFA07A" },
  { key: "hourly_exports", label: "Hourly Exports", color: "#FF6347" },
];

// Define legend items based on the image - moved outside component
const displayLegendItems = [
  { label: "Total", color: "#1ED087" },
  { label: "Nuclear", color: "#DAA520" },
  { label: "Hydro", color: "#FFD700" },
  { label: "Wind", color: "#90EE90" },
  { label: "Gas", color: "#87CEEB" },
  { label: "Solar", color: "#9370DB" },
  { label: "Biofuel", color: "#FF69B4" },
  { label: "Hourly Imports", color: "#FFA07A" },
  { label: "Hourly Exports", color: "#FF6347" },
];

const generateMockData = (timeFilter: string): GeneratorApiDataPoint[] => {
  const now = new Date();
  let dataPoints: number;
  let unit: "hour" | "day";

  switch (timeFilter) {
    case "last_week":
      dataPoints = 7;
      unit = "day";
      break;
    case "last_month":
      dataPoints = 30;
      unit = "day";
      break;
    case "yesterday":
      dataPoints = 24;
      unit = "hour";
      break;
    case "today":
    default:
      dataPoints = 24;
      unit = "hour";
      break;
  }

  const mockData: GeneratorApiDataPoint[] = [];
  for (let i = dataPoints - 1; i >= 0; i--) {
    const timestamp = new Date(now);
    if (unit === "hour") {
      timestamp.setHours(now.getHours() - i);
    } else {
      timestamp.setDate(now.getDate() - i);
    }

    // Generate realistic generator values
    const nuclear = 800 + Math.random() * 200;
    const hydro = 400 + Math.random() * 150;
    const wind =
      300 + Math.sin(i / (dataPoints / Math.PI)) * 200 + Math.random() * 100;
    const gas = 600 + Math.random() * 300;
    const solar =
      unit === "hour"
        ? i >= 6 && i <= 18
          ? 200 + Math.sin(((i - 6) / 12) * Math.PI) * 150 + Math.random() * 50
          : Math.random() * 20
        : 200 + Math.random() * 150;
    const biofuel = 100 + Math.random() * 50;
    const other = 50 + Math.random() * 30;
    const hourly_imports = 100 + Math.random() * 200;
    const hourly_exports = 50 + Math.random() * 150;

    const total =
      nuclear +
      hydro +
      wind +
      gas +
      solar +
      biofuel +
      other +
      hourly_imports -
      hourly_exports;

    mockData.push({
      id: i,
      timestamp: timestamp.toISOString(),
      nuclear: `${nuclear.toFixed(0)} MW`,
      hydro: `${hydro.toFixed(0)} MW`,
      wind: `${wind.toFixed(0)} MW`,
      gas: `${gas.toFixed(0)} MW`,
      solar: `${solar.toFixed(0)} MW`,
      biofuel: `${biofuel.toFixed(0)} MW`,
      other: `${other.toFixed(0)} MW`,
      total: `${total.toFixed(0)} MW`,
      hourly_imports: `${hourly_imports.toFixed(0)} MW`,
      hourly_exports: `${hourly_exports.toFixed(0)} MW`,
    });
  }
  return mockData;
};

const GeneratorAvailability = () => {
  const [chartDatasets, setChartDatasets] = useState<any[]>([]);
  const [tooltipDataMapping, setTooltipDataMapping] =
    useState<TooltipDataMapping>({});
  const [loading, setLoading] = useState(true);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("today");
  const { message } = App.useApp();

  useEffect(() => {
    const fetchData = async (timeFilter: string) => {
      setLoading(true);
      try {
        // const apiUrl = `?time_filter=${timeFilter}`;
        // const response = await BackendAPI.getGeneratorAvailability(apiUrl);
        const apiData: GeneratorApiDataPoint[] = generateMockData(timeFilter);

        if (!apiData || apiData.length === 0) {
          setChartDatasets([]);
          setTooltipDataMapping({});
          message.info(
            "No generator availability data found for the selected period.",
          );
          return; // Exit early if no data
        }

        // Process datasets for chart
        const processedDatasets = generatorConfig.map((config) => ({
          label: config.label,
          data: apiData.map((item: GeneratorApiDataPoint) => ({
            timestamp: item.timestamp,
            value:
              item[config.key as keyof GeneratorApiDataPoint] !== undefined
                ? item[config.key as keyof GeneratorApiDataPoint]
                : "0 MW",
          })),
          color: config.color,
          dataKey: config.key,
        }));
        setChartDatasets(processedDatasets);

        // Process tooltip data
        const mapping: TooltipDataMapping = {};
        apiData.forEach((item: GeneratorApiDataPoint) => {
          mapping[item.timestamp] = generatorConfig
            .filter((config) => config.key !== "total")
            .map((config) => ({
              label: config.label,
              value: String(
                item[config.key as keyof GeneratorApiDataPoint] || "N/A",
              ),
            }));
        });
        setTooltipDataMapping(mapping);
      } catch (error: any) {
        console.error("Error fetching generator availability data:", error);
        message.error(
          error.message || "Failed to load generator availability data.",
        );
        setChartDatasets([]);
        setTooltipDataMapping({});
      } finally {
        setLoading(false);
      }
    };

    fetchData(selectedTimeFilter);
  }, [selectedTimeFilter, message]);

  const handleTimeChange = (newTimeOption: string) => {
    const timeFilterMap: { [key: string]: string } = {
      Today: "today",
      Yesterday: "yesterday",
      "Last Week": "last_week",
      "Last Month": "last_month",
    };
    const apiFilter = timeFilterMap[newTimeOption] || "today";
    setSelectedTimeFilter(apiFilter);
  };

  if (loading) {
    return <div>Loading Generator Availability Data...</div>;
  }

  return (
    <ChartSection
      title="Generator Availability"
      subtitle="View your team's trades and transactions."
      timeOptions={["Today", "Yesterday", "Last Week", "Last Month"]}
      datasets={chartDatasets} // Pass fetched and processed datasets
      tooltipDataMapping={tooltipDataMapping}
      tooltipTitle="Generator Availability"
      legendItems={displayLegendItems}
      onTimeChange={handleTimeChange}
    />
  );
};

export default GeneratorAvailability;
