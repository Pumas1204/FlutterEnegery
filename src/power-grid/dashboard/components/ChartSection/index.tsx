"use client";
import { useState, useEffect } from "react";
import { Select } from "antd";
import styles from "../../dashboard.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to parse MW values
const parseValue = (value: string | number): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }
  return 0;
};

interface TooltipData {
  label: string;
  value: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: { [key: string]: any }; // The data point for this tooltip entry
    dataKey: string; // The key for this specific line
    color: string;
    name: string; // Legend name
    value: number; // The value for this line at this point
  }>;
  tooltipDataMapping?: { [timestamp: string]: TooltipData[] };
  tooltipTitle?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  tooltipDataMapping,
  tooltipTitle,
}) => {
  // Use the raw timestamp from the payload, not the formatted label
  const rawTimestamp =
    payload && payload.length > 0 ? payload[0].payload.timestamp : undefined;
  const currentDataPoint =
    rawTimestamp && tooltipDataMapping && tooltipDataMapping[rawTimestamp];

  if (active && payload && payload.length && currentDataPoint) {
    return (
      <div className={styles.popup}>
        {tooltipTitle && (
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
            {tooltipTitle}
          </div>
        )}
        {currentDataPoint.map((item: TooltipData, index: number) => (
          <div key={index} className={styles.row}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

interface Dataset {
  label: string;
  data: Array<{
    timestamp: string;
    value: string | number;
    [key: string]: any; // Allow other properties for tooltip
  }>;
  color: string;
  dataKey: string; // Key to access value within data objects
  strokeDasharray?: string; // Optional prop for dashed lines
}

interface ChartSectionProps {
  title: string;
  subtitle: string;
  timeOptions: string[];
  datasets: Dataset[];
  tooltipDataMapping?: { [timestamp: string]: TooltipData[] };
  tooltipTitle?: string;
  legendItems?: Array<{
    label: string;
    color: string;
  }>;
  onTimeChange?: (newTime: string) => void; // Optional callback for time change
}

const ChartSection: React.FC<ChartSectionProps> = ({
  title,
  subtitle,
  timeOptions,
  datasets,
  tooltipDataMapping,
  tooltipTitle,
  legendItems,
  onTimeChange, // Receive the callback
}) => {
  const [selectedTime, setSelectedTime] = useState<string>(timeOptions[0]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Combine datasets into a format suitable for Recharts
    const combinedData: { [key: string]: any } = {};

    datasets?.forEach((dataset) => {
      dataset?.data?.forEach((point) => {
        if (!combinedData[point.timestamp]) {
          combinedData[point.timestamp] = { timestamp: point.timestamp };
        }
        // Ensure the value exists before parsing
        if (point.value !== undefined && point.value !== null) {
          combinedData[point.timestamp][dataset.dataKey] = parseValue(
            point.value,
          );
        }
      });
    });

    // Sort data by timestamp
    const sortedData = Object.values(combinedData).sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );

    // Format timestamp for XAxis
    const formattedData = sortedData.map((item) => ({
      ...item,
      formattedTimestamp: new Date(item.timestamp)
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase()
        .replace(/^0/, ""), // Format like '8:00 am'
    }));

    setChartData(formattedData);
  }, [datasets]);

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    if (onTimeChange) {
      onTimeChange(value); // Call the callback if provided
    }
    // Here you would typically trigger a data refetch based on the new time
  };

  const renderChart = () => {
    if (!chartData || chartData.length === 0) {
      return (
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
          }}
        >
          Loading chart data...
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e0e0e0"
          />
          <XAxis
            dataKey="formattedTimestamp"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6c757d", fontSize: 12 }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
            tick={{ fill: "#6c757d", fontSize: 12 }}
            domain={["auto", "auto"]}
            width={80}
          />
          <Tooltip
            content={
              <CustomTooltip
                tooltipDataMapping={tooltipDataMapping}
                tooltipTitle={tooltipTitle}
              />
            }
            cursor={{
              stroke: "#1D2432",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
          />
          {datasets.map((dataset) => (
            <Line
              key={dataset.label}
              type="monotone"
              dataKey={dataset.dataKey}
              stroke={dataset.color}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: dataset.color,
                stroke: "white",
                strokeWidth: 2,
              }}
              name={dataset.label}
              strokeDasharray={dataset.strokeDasharray}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderLegend = () =>
    legendItems && (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {legendItems.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span style={{ fontSize: "14px", color: "#6c757d" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );

  return (
    <div className={styles.chartContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div>
          <div className={styles.sectionHeader}>{title}</div>
          <div className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>
            {subtitle}
          </div>
        </div>
      </div>

      <Select
        value={selectedTime}
        onChange={handleTimeChange}
        popupMatchSelectWidth={false}
      >
        {timeOptions.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      {renderLegend()}

      {renderChart()}
    </div>
  );
};

export default ChartSection;
