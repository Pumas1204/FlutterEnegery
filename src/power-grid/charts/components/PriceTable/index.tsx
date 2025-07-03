"use client";
import React, { useState, useEffect } from "react";
import { Table, Tag, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import styles from "../../charts.module.scss";
import {
  BatteryIcon,
  PowerGridIcon,
} from "../../../dashboard/components/Icons";
import { BackendAPI } from "power-grid/api/backendApi";

interface DataType {
  key: React.Key;
  time: string;
  supply: string;
  demand: string;
  pricePrediction: string;
  status: "Battery" | "Power Grid";
}

interface ApiResponse {
  results: Array<{
    timestamp: string;
    supply: string;
    demand: string;
    price: string;
    prediction: string;
    source: string;
  }>;
}

const StatusTag: React.FC<{ status: "Battery" | "Power Grid" }> = ({
  status,
}) => {
  const isBattery = status === "Battery";
  return (
    <Tag
      className={
        styles.statusTag + " " + (isBattery ? styles.battery : styles.powerGrid)
      }
      icon={
        isBattery ? (
          <BatteryIcon color="#1ED087" />
        ) : (
          <PowerGridIcon color="#1ED087" />
        )
      }
    >
      {status}
    </Tag>
  );
};

const PriceTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await BackendAPI.getPriceChart("");
        const apiData = response.results || [];

        if (!apiData || apiData.length === 0) {
          message.info("No price data found.");
          setData([]);
          return;
        }

        const formattedData: DataType[] = apiData.map(
          (item: ApiResponse["results"][0], index: number) => ({
            key: index + 1,
            time: new Date(item.timestamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
            supply: `${parseFloat(item.supply).toLocaleString()} MW`,
            demand: `${parseFloat(item.demand).toLocaleString()} MW`,
            pricePrediction: `$${item.price} / $${item.prediction}`,
            status: item.source.toLowerCase().includes("battery")
              ? "Battery"
              : "Power Grid",
          }),
        );

        setData(formattedData);
      } catch (error: any) {
        console.error("Error fetching price table data:", error);
        message.error(error.message || "Failed to load price table data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: (
        <>
          Time <DownOutlined style={{ fontSize: "10px" }} />
        </>
      ),
      dataIndex: "time",
      sorter: (a, b) => {
        const timeA = new Date(
          `1970/01/01 ${a.time.replace(" am", " AM").replace(" pm", " PM")}`,
        ).getTime();
        const timeB = new Date(
          `1970/01/01 ${b.time.replace(" am", " AM").replace(" pm", " PM")}`,
        ).getTime();
        return timeA - timeB;
      },
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Supply",
      dataIndex: "supply",
    },
    {
      title: "Demand",
      dataIndex: "demand",
    },
    {
      title: "Price / Prediction",
      dataIndex: "pricePrediction",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: "Battery" | "Power Grid") => (
        <StatusTag status={status} />
      ),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        className={styles.priceAntTable}
        loading={loading}
      />
    </div>
  );
};

export default PriceTable;
